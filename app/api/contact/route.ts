import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

// ─── Security Helpers ────────────────────────────────────────────────────────

/** Strip HTML tags to prevent XSS in email body */
function sanitizeText(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/** Validate email format using a strict regex */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
}

/** Simple in-memory rate limiter (per IP, per minute) */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;          // max requests
const RATE_WINDOW_MS = 60_000; // per 60 seconds

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) {
    return true;
  }

  entry.count += 1;
  return false;
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    // --- Rate Limiting ---
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { message: 'Too many requests. Please wait a moment and try again.' },
        { status: 429 }
      );
    }

    // --- Parse & Validate Content-Type ---
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json(
        { message: 'Invalid content type. Expected application/json.' },
        { status: 415 }
      );
    }

    // --- Parse Body ---
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { message: 'Invalid JSON payload.' },
        { status: 400 }
      );
    }

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
    }

    const { name, email, message } = body as Record<string, unknown>;

    // --- Field Presence ---
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Missing required fields: name, email, and message are all required.' },
        { status: 400 }
      );
    }

    // --- Type Checks ---
    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return NextResponse.json(
        { message: 'All fields must be strings.' },
        { status: 400 }
      );
    }

    // --- Length Validation ---
    if (name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json(
        { message: 'Name must be between 2 and 100 characters.' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email.trim())) {
      return NextResponse.json(
        { message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (message.trim().length < 10 || message.trim().length > 5000) {
      return NextResponse.json(
        { message: 'Message must be between 10 and 5000 characters.' },
        { status: 400 }
      );
    }

    // --- Sanitize Inputs ---
    const safeName = sanitizeText(name.trim());
    const safeEmail = email.trim().toLowerCase();
    const safeMessage = sanitizeText(message.trim());

    // --- 1. SEND EMAIL ---
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      const mailOptions = {
        from: `"Sofycode Contact Form" <${process.env.SMTP_EMAIL}>`,
        to: process.env.CONTACT_RECEIVER_EMAIL || 'officialsofycode@gmail.com',
        replyTo: safeEmail,
        subject: `New Project Inquiry from ${safeName}`,
        // Plain text fallback
        text: `New message via sofycode.com contact form.\n\nName: ${safeName}\nEmail: ${safeEmail}\n\nMessage:\n${safeMessage}`,
        // HTML email — inputs are already sanitized
        html: `
          <div style="font-family: sans-serif; padding: 24px; color: #1e293b; max-width: 600px;">
            <h2 style="color: #2563eb; margin-bottom: 24px; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">
              📩 New Project Inquiry
            </h2>
            <table cellpadding="8" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="font-weight: bold; color: #64748b; width: 120px;">Name:</td>
                <td>${safeName}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; color: #64748b;">Email:</td>
                <td>${safeEmail}</td>
              </tr>
            </table>
            <div style="margin-top: 20px;">
              <p style="font-weight: bold; color: #64748b; margin-bottom: 8px;">Message:</p>
              <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #2563eb; white-space: pre-wrap; line-height: 1.7;">
                ${safeMessage.replace(/\n/g, '<br/>')}
              </div>
            </div>
            <p style="margin-top: 24px; font-size: 12px; color: #94a3b8;">
              Sent via sofycode.com contact form · ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Colombo' })}
            </p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Failed to send email via SMTP:', emailError);
      // We log but don't block; Google Sheets logging still executes
    }

    // --- 2. SAVE TO GOOGLE SHEET ---
    try {
      const serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
      const privateKeyEnv = process.env.GOOGLE_PRIVATE_KEY;
      const sheetId = process.env.GOOGLE_SHEET_ID;

      if (serviceEmail && privateKeyEnv && sheetId) {
        const privateKey = privateKeyEnv.replace(/\\n/g, '\n');

        const auth = new google.auth.GoogleAuth({
          credentials: {
            client_email: serviceEmail,
            private_key: privateKey,
          },
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Colombo' });

        await sheets.spreadsheets.values.append({
          spreadsheetId: sheetId,
          range: 'Sheet1!A1:D1',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            // Store plain (un-sanitized) text in sheets for readability; sheets is not a web surface
            values: [[timestamp, name.trim(), safeEmail, message.trim()]],
          },
        });
      } else {
        // console.warn('Google Sheets configuration missing. Form data was not appended.');
      }
    } catch (sheetError) {
      console.error('Failed to append row to Google Sheets:', sheetError);
    }

    return NextResponse.json(
      { message: 'Request processed successfully!' },
      {
        status: 200,
        headers: {
          // Prevent response caching
          'Cache-Control': 'no-store',
        },
      }
    );

  } catch (error) {
    console.error('Unexpected error handling form submission:', error);
    return NextResponse.json(
      // Never expose internal error details in production
      { message: 'A server error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

// Block all other HTTP methods explicitly
export async function GET() {
  return NextResponse.json({ message: 'Method not allowed.' }, { status: 405 });
}
