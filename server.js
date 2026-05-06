const express = require('express');
const cors    = require('cors');
const fetch   = require('node-fetch');
const path    = require('path');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 3001;

const OPENROUTER_KEY   = process.env.OPENROUTER_API_KEY;
const OPENROUTER_KEY_2 = process.env.OPENROUTER_API_KEY_2;

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '20mb' }));

// Serve the frontend — works both locally (../frontend) and on Railway (./frontend)
const frontendPath = path.join(__dirname, 'frontend');
const frontendPathAlt = path.join(__dirname, '../frontend');
const fs = require('fs');
const staticPath = fs.existsSync(frontendPath) ? frontendPath : frontendPathAlt;
app.use(express.static(staticPath, {
  setHeaders(res, filePath) {
    if (filePath.endsWith('.html')) res.setHeader('Cache-Control', 'no-store');
  }
}));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status:      'ok',
    openrouter:  OPENROUTER_KEY   ? '✅ loaded' : '❌ missing',
    openrouter2: OPENROUTER_KEY_2 ? '✅ loaded' : '⚠  not set'
  });
});

// ── CHAT ENDPOINT ──────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  const { messages, model } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages must be a non-empty array' });
  }

  if (!OPENROUTER_KEY) {
    return res.status(500).json({ error: 'OPENROUTER_API_KEY not set in .env' });
  }

  const orModel  = model || 'openai/gpt-4o-mini';
  const siteUrl  = process.env.SITE_URL || 'http://localhost:3001';
  const orBody   = JSON.stringify({ model: orModel, messages, stream: true });

  const makeHeaders = (key) => ({
    'Content-Type':  'application/json',
    'Authorization': `Bearer ${key}`,
    'HTTP-Referer':  siteUrl,
    'X-Title':       'NovaMind'
  });

  let apiRes;
  try {
    apiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST', headers: makeHeaders(OPENROUTER_KEY), body: orBody
    });

    // Auto-failover: if key 1 is rate-limited or rejected, silently try key 2
    if (!apiRes.ok && (apiRes.status === 401 || apiRes.status === 429) && OPENROUTER_KEY_2) {
      console.log(`[OpenRouter] Key 1 returned ${apiRes.status} — trying key 2…`);
      apiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST', headers: makeHeaders(OPENROUTER_KEY_2), body: orBody
      });
    }
  } catch (err) {
    console.error('[OpenRouter] Fetch failed:', err.message);
    return res.status(500).json({ error: 'Could not connect to OpenRouter.' });
  }

  if (!apiRes.ok) {
    const e = await apiRes.json().catch(() => ({}));
    console.error('[OpenRouter] API error:', e);
    return res.status(apiRes.status).json({ error: e?.error?.message || 'OpenRouter error' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('X-Accel-Buffering', 'no');
  apiRes.body.pipe(res);
});

// Catch-all: SPA support
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n✦ NovaMind running → http://localhost:${PORT}`);
  console.log(`  OpenRouter key 1: ${OPENROUTER_KEY   ? '✅ loaded' : '❌ missing — add OPENROUTER_API_KEY to .env'}`);
  console.log(`  OpenRouter key 2: ${OPENROUTER_KEY_2 ? '✅ loaded' : '⚠  not set (optional backup)'}`);
  console.log(`\n  Open http://localhost:${PORT} in your browser\n`);
});
