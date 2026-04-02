<p align="center">
  <img src="public/logo_light_fixed_v3.png" alt="Sofycode Logo" width="200" />
</p>

<h1 align="center">Sofycode</h1>

<p align="center">
  <strong>Custom Software Development Agency — Website</strong>
</p>

<p align="center">
  <a href="https://sofycode.com">Live Site</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#tech-stack">Tech Stack</a>
</p>

---

## About

Sofycode is a custom software development agency that builds secure, scalable software — from MVP to enterprise-grade platforms. This repository contains the source code for the **Sofycode website**, built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**.

The site includes a landing page, about page, work/portfolio page, pricing page, a contact form powered by Nodemailer, a WhatsApp chat widget, and an AI-powered chatbot microservice.

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or yarn / pnpm / bun)
- **Git**

### Clone the Repository

```bash
git clone git@github.com:DevAlexParker/sofycode.git
cd sofycode
```

> **Using HTTPS?**
> ```bash
> git clone https://github.com/DevAlexParker/sofycode.git
> ```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root based on the example:

```bash
cp "Example env" .env
```

Then fill in the required values:

| Variable        | Description                       |
| --------------- | --------------------------------- |
| `SMTP_EMAIL`    | Email address for the SMTP server |
| `SMTP_PASSWORD` | Password / app password for SMTP  |

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

### Build for Production

```bash
npm run build
npm start
```

---

## Project Structure

```
sofycode/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (Navbar, Footer, ThemeProvider)
│   ├── page.tsx                # Home / Landing page
│   ├── page.module.css         # Home page styles
│   ├── globals.css             # Global CSS
│   ├── icon.png                # Favicon source
│   ├── about/                  # About page
│   │   └── page.tsx
│   ├── work/                   # Portfolio / Projects page
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── pricing/                # Pricing page
│   │   ├── layout.tsx
│   │   ├── metadata.ts
│   │   └── page.tsx
│   ├── privacy/                # Privacy policy page
│   ├── terms/                  # Terms of service page
│   ├── admin/                  # Admin section
│   └── api/
│       └── contact/
│           └── route.ts        # Contact form API (Nodemailer)
│
├── components/                 # Shared React components
│   ├── Navbar.tsx              # Navigation bar with theme toggle
│   ├── Footer.tsx              # Site footer
│   ├── ThemeProvider.tsx        # Dark / Light mode provider
│   ├── ChatWidget.tsx          # AI chatbot widget
│   ├── ChatWidget.module.css   # Chatbot styles
│   └── WhatsAppWidget.tsx      # WhatsApp floating button
│
├── public/                     # Static assets
│   ├── logo_dark_transparent_v2.png
│   ├── logo_light_fixed_v2.png
│   ├── logo_light_fixed_v3.png
│   ├── favicon-icon.png
│   ├── projects/               # Project screenshots / images
│   ├── services/               # Service-related images
│   └── team/                   # Team member photos
│
├── sofycode-chatbot/           # AI Chatbot microservice (Python)
│   ├── main.py                 # FastAPI server
│   ├── ingest.py               # PDF ingestion for RAG
│   ├── sofycode.pdf            # Knowledge base document
│   └── uploads/                # Uploaded files
│
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── postcss.config.mjs          # PostCSS configuration
├── eslint.config.mjs           # ESLint configuration
├── package.json                # Dependencies & scripts
└── Example env                 # Example environment variables
```

---

## Tech Stack

### Frontend

| Technology       | Version | Purpose                          |
| ---------------- | ------- | -------------------------------- |
| **Next.js**      | 16.1.6  | React framework (App Router)     |
| **React**        | 19.2.3  | UI library                       |
| **Tailwind CSS** | 4.x     | Utility-first CSS framework      |
| **TypeScript**   | 5.x     | Type safety                      |
| **next-themes**  | 0.4.6   | Dark / light mode                |
| **Lucide React** | 0.577   | Icon library                     |
| **React Icons**  | 5.6.0   | Additional icon library          |
| **Nodemailer**   | 8.x     | Email sending (contact form API) |
| **Google APIs**  | 171.x   | Google services integration      |

### Chatbot Microservice

| Technology  | Purpose                            |
| ----------- | ---------------------------------- |
| **Python**  | Runtime                            |
| **FastAPI** | API framework                      |
| **RAG**     | PDF-based knowledge retrieval      |

---

## Available Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start development server          |
| `npm run build`   | Create optimized production build |
| `npm start`       | Start production server           |
| `npm run lint`    | Run ESLint                        |

---

## Features

- 🌗 **Dark / Light Mode** — seamless theme switching with system preference detection
- 📱 **Fully Responsive** — mobile-first design with optimized layouts for all screen sizes
- 📬 **Contact Form** — server-side email delivery via Nodemailer SMTP
- 💬 **WhatsApp Widget** — floating WhatsApp button for instant customer communication
- 🤖 **AI Chatbot** — RAG-powered chatbot using a Python FastAPI microservice
- 🔍 **SEO Optimized** — full Open Graph, Twitter Cards, structured metadata, and robots config
- ⚡ **Performance** — Next.js App Router with server components, optimized fonts & images

---

## Deployment

The site is deployed at **[sofycode.com](https://sofycode.com)**. The easiest way to deploy a Next.js app is via the [Vercel Platform](https://vercel.com).

For other deployment methods, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---

## License

This is a private repository. All rights reserved © Sofycode.
