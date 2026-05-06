# NovaMind — AI Assistant Application

A fully custom AI chat web app powered by OpenRouter. Stream responses from GPT-4o, Claude, Llama, and more — all through your own server with your own branding.

## Features

- Real-time streaming AI chat
- Multiple AI models to choose from
- Image generation (free, no extra API key)
- File and image attachments
- Chat history saved locally
- Customizable themes (Default / Dark / Light)
- Personality modes for the AI
- Custom fonts for responses
- Profile picture and name settings
- Firebase sign-in (Google + Email)
- Automatic API key failover

## Requirements

- Node.js (v18 or higher)
- OpenRouter account + API key

---

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Zara-Irfan/novamind.git
cd novamind
```

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Create Environment Variables

Inside the `backend` folder, create a file called `.env`

```env
OPENROUTER_API_KEY=your_key_here
OPENROUTER_API_KEY_2=your_backup_key_here
PORT=3001
SITE_URL=http://localhost:3001
```

**Notes:**
- Replace `your_key_here` with your actual OpenRouter API key
- `OPENROUTER_API_KEY_2` is optional and acts as a backup key

### 4. Get an OpenRouter API Key

1. Go to https://openrouter.ai
2. Sign in or create an account
3. Open **Keys**
4. Click **Create Key**
5. Copy your key into `.env`

### 5. Run the App

Option 1: Double-click `start.bat`

Or run manually:

```bash
cd backend
node server.js
```

Then open:

```bash
http://localhost:3001
```

---

## Project Structure

```bash
novamind/
├── frontend/
│   └── index.html
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── frontend/
├── .gitignore
├── start.bat
└── README.md
```

---

## Deployment (Railway)

1. Push code to GitHub
2. Go to https://railway.app
3. Create a new project
4. Deploy from GitHub repo
5. Select `novamind`

Use these settings:

- **Root Directory:** `backend`
- **Start Command:** `node server.js`

Add Railway variables:

```env
OPENROUTER_API_KEY=your_key_here
OPENROUTER_API_KEY_2=your_backup_key_here
PORT=3001
SITE_URL=https://your-app.up.railway.app
```

Then:

1. Click **Deploy**
2. Go to **Settings → Networking**
3. Generate a domain
4. Update `SITE_URL` with your real Railway URL

---

## Updating Your Live App

Whenever you make changes:

```bash
git add .
git commit -m "describe your change"
git push
```

Railway automatically redeploys after every push.

---

## Firebase Authentication (Optional)

To enable Google + Email sign-in:

1. Go to https://console.firebase.google.com
2. Create a project
3. Open **Authentication**
4. Enable:
   - Google
   - Email/Password

Then:

1. Go to **Project Settings**
2. Create a Web App
3. Copy Firebase config
4. Open `frontend/index.html`
5. Replace `FIREBASE_CONFIG` with your values

---

## Available Models

| Model | Description |
|---|---|
| GPT-4o Mini | Fast and affordable (default) |
| Claude 3.5 Haiku | Anthropic fast model |
| Claude 3 Haiku | Lightweight Claude model |
| Llama 3 8B | Open-source model |

You can add more models by editing the model selector in `frontend/index.html`.

---

## Security

- API keys stored in `.env`
- `.gitignore` blocks `.env` from GitHub
- Railway stores environment variables securely
- Backup API key failover system included

**Never upload your `.env` file.**

---

## Built With

- Node.js + Express
- OpenRouter API
- Pollinations.ai
- Firebase Authentication
- HTML, CSS, JavaScript

---

## Live Demo

https://novamindai.up.railway.app
