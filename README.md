# NovaMind — AI Chat Application
A fully custom AI chat web app powered by OpenRouter. Stream responses from GPT-4o, Claude, Llama and more — all through your own server with your own branding.

#### What You Get
Real-time streaming AI chat
Multiple AI models to choose from
Image generation (free, no extra API key)
File and image attachments
Chat history saved locally
Customizable themes (Default / Dark / Light)
Personality modes for the AI
Custom fonts for responses
Profile picture and name settings
Firebase sign-in (Google + Email)
Automatic API key failover
Requirements
Node.js (v18 or higher)
An OpenRouter account and API key
Setup — Step by Step
### Step 1 — Clone the repository

git clone https://github.com/Zara-Irfan/novamind.git
cd novamind
### Step 2 — Install dependencies

cd backend
npm install
### Step 3 — Create your API keys file
Inside the backend folder, create a file called .env

Paste this inside it:


OPENROUTER_API_KEY=your_key_here
OPENROUTER_API_KEY_2=your_backup_key_here
PORT=3001
SITE_URL=http://localhost:3001
Replace your_key_here with your actual OpenRouter API key.
OPENROUTER_API_KEY_2 is optional — it acts as a backup if the first key fails.

### Step 4 — Get your OpenRouter API key
Go to openrouter.ai
Sign up or log in
Go to Keys then Create Key
Copy the key and paste it into your .env file
### Step 5 — Run the app
Double-click start.bat — or run manually:


cd backend
node server.js
Then open http://localhost:3001 in your browser.

### Project Structure

novamind/
├── frontend/
│   └── index.html          # The entire UI (HTML + CSS + JS)
├── backend/
│   ├── server.js           # Express server and API proxy
│   ├── package.json        # Dependencies
│   ├── .env                # Your API keys (never upload this)
│   └── frontend/           # Copy of frontend for deployment
├── .gitignore              # Keeps .env off GitHub automatically
├── start.bat               # One-click launcher for Windows
└── README.md               # This file
Deploying to Railway
Push your code to GitHub — .env is blocked by .gitignore automatically
Go to railway.app and sign in with GitHub
Click New Project → Deploy from GitHub repo and select novamind
Set Root Directory to backend
Set Start Command to node server.js
Go to the Variables tab and add:

OPENROUTER_API_KEY=your_key_here
OPENROUTER_API_KEY_2=your_backup_key_here
PORT=3001
SITE_URL=https://your-app.up.railway.app
Click Deploy — your app will be live in about a minute
Go to Settings → Networking → Generate Domain to get your public URL
Update SITE_URL in Variables to match your actual Railway URL
Updating Your Live App
Every time you make changes locally, run these 3 commands:


git add .
git commit -m "describe your change"
git push
Railway will automatically redeploy every time you push.

Firebase Sign-In (Optional)
To enable Google and Email sign-in:

Go to console.firebase.google.com
Create a new project
Go to Authentication and enable Google and Email/Password
Go to Project Settings → Web App and copy your config
Open frontend/index.html and find FIREBASE_CONFIG
Replace the placeholder values with your actual Firebase config
Important — Never Upload Your .env File
Your .env file contains your API keys. The .gitignore file already blocks it from GitHub automatically. Never remove .env from .gitignore.

Models Available
Model	Description
GPT-4o Mini	Fast and affordable (default)
Claude 3.5 Haiku	Anthropic's fast model
Claude 3 Haiku	Anthropic's lightweight model
Llama 3 8B	Open source, free to use
You can add more models by editing the model selector in frontend/index.html.

#### Built With
Node.js + Express
OpenRouter API
Pollinations.ai for image generation
Firebase Authentication
Vanilla HTML, CSS, JavaScript
