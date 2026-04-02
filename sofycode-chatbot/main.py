import requests
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 1. META WHATSAPP CREDENTIALS ---
# Paste your credentials from the Meta Developer Dashboard here
WHATSAPP_TOKEN = "EAANYSPwsZBeoBQxhT648qPIJhTQVAb22Y8hxVVRlobIYO7IIJjw9ASnCM5DV66ZAZBHJwOjKEIqfiJKdeJM7XCvSKZCMAzWUmSW2AZBf9yloDmBXIS0zkdtYgCMXcHZCULUOUd9yERolXkA2VY44xv2pqZAlazZB6T4oqGHsNRXciE6aP76Conh3wWSCFwMT0bSfPgZDZD"
PHONE_NUMBER_ID = "955050977701679"
# Create your own password here. You will give this to Meta later.
VERIFY_TOKEN = "sofycode_secure_webhook_123" 


# --- 2. THE VERIFICATION ROUTE ---
# Meta pings this route once to prove you own the server
@app.get("/webhook")
async def verify_webhook(request: Request):
    mode = request.query_params.get("hub.mode")
    token = request.query_params.get("hub.verify_token")
    challenge = request.query_params.get("hub.challenge")

    if mode and token:
        if mode == "subscribe" and token == VERIFY_TOKEN:
            print("WEBHOOK VERIFIED SUCCESSFULLY!")
            return Response(content=challenge, media_type="text/plain")
    return Response(content="Verification failed", status_code=403)


# --- 3. THE DECISION TREE (MESSAGE RECEIVER) ---
@app.post("/webhook")
async def receive_message(request: Request):
    body = await request.json()
    
    try:
        # Navigate Meta's heavy JSON structure to find the actual message
        entry = body.get("entry", [])[0]
        changes = entry.get("changes", [])[0]
        value = changes.get("value", {})
        messages = value.get("messages", [])
        
        if messages:
            message = messages[0]
            sender_phone = message["from"]
            text = message.get("text", {}).get("body", "").strip().lower()

            print(f"Received message from {sender_phone}: {text}")

            # 🚨 YOUR SAAS MENU LOGIC GOES HERE 🚨
            reply_text = ""
            if text == "1":
                reply_text = "Awesome! We build custom web apps, mobile apps, and enterprise software. What are you looking to build?"
            elif text == "2":
                reply_text = "You can view our recent case studies and projects at https://sofycode.com/portfolio."
            elif text == "3":
                reply_text = "I will connect you with a SofyCode engineer. Please type out your question and they will reply shortly!"
                # TODO: You could save this to your SQLite DB here to alert your admin dashboard!
            else:
                # The Default Fallback Menu
                reply_text = (
                    "Welcome to SofyCode! 🚀\n"
                    "Please reply with a number to choose an option:\n\n"
                    "1️⃣ Our Software Services\n"
                    "2️⃣ View Portfolio\n"
                    "3️⃣ Speak to a Human Agent"
                )

            # Send the response back through Meta
            send_whatsapp_message(sender_phone, reply_text)
            
    except Exception as e:
        # Ignore status updates (like "read" or "delivered" receipts)
        pass 
        
    return {"status": "ok"}


# --- 4. THE SEND FUNCTION ---
def send_whatsapp_message(to: str, text: str):
    url = f"https://graph.facebook.com/v18.0/{PHONE_NUMBER_ID}/messages"
    headers = {
        "Authorization": f"Bearer {WHATSAPP_TOKEN}",
        "Content-Type": "application/json"
    }
    data = {
        "messaging_product": "whatsapp",
        "to": to,
        "type": "text",
        "text": {"body": text}
    }
    
    response = requests.post(url, headers=headers, json=data)
    if response.status_code != 200:
        print(f"Failed to send message: {response.text}")