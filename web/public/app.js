// ── WebSocket ────────────────────────────────────────────────────────────────

const WS_URL = `ws://${location.host}`;
let ws = null;

function connect() {
  ws = new WebSocket(WS_URL);

  ws.onopen = () => {
    setStatus('connected', 'Conectado');
    setInputEnabled(true);
    // Sincroniza tamanho do terminal com o PTY
    const { cols, rows } = term;
    send('resize', { cols, rows });
  };

  ws.onclose = () => {
    setStatus('disconnected', 'Desconectado');
    setInputEnabled(false);
    setTimeout(connect, 3000); // reconexão automática
  };

  ws.onerror = () => {
    setStatus('disconnected', 'Erro de conexão');
  };

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    switch (msg.type) {
      case 'output':  handleOutput(msg.text);    break;
      case 'state':   handleState(msg.data);     break;
      case 'history': handleHistory(msg.squads); break;
      case 'status':  handlePtyStatus(msg);      break;
    }
  };
}

function send(type, payload) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type, ...payload }));
  }
}

// ── Status bar ───────────────────────────────────────────────────────────────

const $statusDot   = document.getElementById('statusDot');
const $statusLabel = document.getElementById('statusLabel');

function setStatus(state, label) {
  $statusDot.className = `status-dot ${state}`;
  $statusLabel.textContent = label;
}

// ── PTY status ───────────────────────────────────────────────────────────────

function handlePtyStatus({ alive }) {
  setInputEnabled(alive);
}

// ── Terminal (xterm.js) ──────────────────────────────────────────────────────

const term = new Terminal({
  theme: {
    background:  '#0d0d0d',
    foreground:  '#e8e8e8',
    cursor:      '#7c6af7',
    cursorAccent:'#0d0d0d',
    black:       '#1c1c1c',
    brightBlack: '#444',
    red:         '#f87171',
    brightRed:   '#fca5a5',
    green:       '#3ecf8e',
    brightGreen: '#6ee7b7',
    yellow:      '#f5c842',
    brightYellow:'#fde68a',
    blue:        '#7c6af7',
    brightBlue:  '#a5b4fc',
    magenta:     '#c084fc',
    brightMagenta:'#d8b4fe',
    cyan:        '#22d3ee',
    brightCyan:  '#67e8f9',
    white:       '#e8e8e8',
    brightWhite: '#ffffff',
  },
  fontFamily: "'Cascadia Code', 'Fira Code', Consolas, monospace",
  fontSize: 12,
  lineHeight: 1.5,
  cursorBlink: true,
  scrollback: 2000,
  convertEol: false,
});

const fitAddon = new FitAddon.FitAddon();
term.loadAddon(fitAddon);
term.open(document.getElementById('terminal'));
fitAddon.fit();

// Ajusta tamanho quando a janela redimensiona
window.addEventListener('resize', () => fitAddon.fit());

// Sincroniza tamanho do terminal com o PTY no servidor
term.onResize(({ cols, rows }) => {
  send('resize', { cols, rows });
});

function handleOutput(text) {
  term.write(text);
}

// ── Avatar System ─────────────────────────────────────────────────────────────

function getAvatarType(agentId) {
  const id = (agentId || '').toLowerCase();
  if (/pedagog|teacher|professor|mestre|instrutor/.test(id)) return 'teacher';
  if (/roteirist|writer|script|redator|autor/.test(id))      return 'writer';
  if (/revisor|review|editor|corret|critic/.test(id))        return 'reviewer';
  if (/design|visual|artis|graphic|criativ/.test(id))        return 'designer';
  if (/pesquis|research|analista|analyst|dados/.test(id))    return 'researcher';
  const types = ['teacher','writer','reviewer','designer','researcher','default'];
  const hash  = (agentId||'').split('').reduce((a,c) => a + c.charCodeAt(0), 0);
  return types[hash % types.length];
}

const AVATARS = {

  teacher: (p) => `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="${p}g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e3a8a"/><stop offset="100%" stop-color="#3b82f6"/>
      </linearGradient>
      <clipPath id="${p}c"><circle cx="40" cy="40" r="40"/></clipPath>
    </defs>
    <circle cx="40" cy="40" r="40" fill="url(#${p}g)"/>
    <ellipse cx="40" cy="82" rx="28" ry="16" fill="#0f172a" clip-path="url(#${p}c)"/>
    <ellipse cx="40" cy="79" rx="16" ry="11" fill="#e2e8f0" clip-path="url(#${p}c)"/>
    <polygon points="39,67 41,67 43,79 40,81 37,79" fill="#dc2626" clip-path="url(#${p}c)"/>
    <rect x="36" y="57" width="8" height="10" rx="3" fill="#fcd5a0" clip-path="url(#${p}c)"/>
    <ellipse cx="40" cy="38" rx="16" ry="18" fill="#fcd5a0"/>
    <ellipse cx="24.5" cy="38" rx="3.5" ry="5" fill="#f5bc89"/>
    <ellipse cx="55.5" cy="38" rx="3.5" ry="5" fill="#f5bc89"/>
    <ellipse cx="40" cy="22" rx="17" ry="10" fill="#2d1b00"/>
    <rect x="24" y="20" width="32" height="7" fill="#2d1b00"/>
    <ellipse cx="40" cy="18.5" rx="21" ry="5.5" fill="#0f172a"/>
    <rect x="27" y="9" width="26" height="11" rx="1" fill="#0f172a"/>
    <line x1="53" y1="12" x2="60" y2="22" stroke="#f59e0b" stroke-width="1.5"/>
    <circle cx="60.5" cy="23" r="2.5" fill="#f59e0b"/>
    <path d="M31 28.5 Q34 26 37 28.5" fill="none" stroke="#2d1b00" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M43 28.5 Q46 26 49 28.5" fill="none" stroke="#2d1b00" stroke-width="1.5" stroke-linecap="round"/>
    <rect x="29" y="31" width="10" height="7" rx="3" fill="none" stroke="#92400e" stroke-width="1.5"/>
    <rect x="41" y="31" width="10" height="7" rx="3" fill="none" stroke="#92400e" stroke-width="1.5"/>
    <line x1="39" y1="34.5" x2="41" y2="34.5" stroke="#92400e" stroke-width="1.5"/>
    <line x1="27" y1="34" x2="29" y2="34" stroke="#92400e" stroke-width="1"/>
    <line x1="51" y1="34" x2="53" y2="34" stroke="#92400e" stroke-width="1"/>
    <ellipse cx="34" cy="34.5" rx="2.5" ry="2.5" fill="#3d2000"/>
    <ellipse cx="46" cy="34.5" rx="2.5" ry="2.5" fill="#3d2000"/>
    <circle cx="34.8" cy="33.7" r=".9" fill="#fff"/>
    <circle cx="46.8" cy="33.7" r=".9" fill="#fff"/>
    <path d="M39 42 Q40 45 41 42" fill="none" stroke="#c9845a" stroke-width="1.2"/>
    <path d="M34 48 Q40 54 46 48" fill="none" stroke="#a0522d" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  writer: (p) => `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="${p}g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#4c1d95"/><stop offset="100%" stop-color="#7c3aed"/>
      </linearGradient>
      <clipPath id="${p}c"><circle cx="40" cy="40" r="40"/></clipPath>
    </defs>
    <circle cx="40" cy="40" r="40" fill="url(#${p}g)"/>
    <ellipse cx="40" cy="82" rx="28" ry="16" fill="#1a0a35" clip-path="url(#${p}c)"/>
    <ellipse cx="40" cy="79" rx="16" ry="11" fill="#f3e8ff" clip-path="url(#${p}c)"/>
    <rect x="36" y="57" width="8" height="10" rx="3" fill="#fde8c8" clip-path="url(#${p}c)"/>
    <ellipse cx="40" cy="38" rx="16" ry="18" fill="#fde8c8"/>
    <ellipse cx="24.5" cy="38" rx="3.5" ry="5" fill="#f5cfa8"/>
    <ellipse cx="55.5" cy="38" rx="3.5" ry="5" fill="#f5cfa8"/>
    <ellipse cx="40" cy="21" rx="17" ry="11" fill="#1a0a30"/>
    <rect x="24" y="20" width="32" height="8" fill="#1a0a30"/>
    <ellipse cx="33" cy="19" rx="12" ry="8" fill="#581c87" transform="rotate(-12 33 19)"/>
    <line x1="45" y1="14" x2="46" y2="20" stroke="#1a0a30" stroke-width="1"/>
    <rect x="43" y="20" width="2.5" height="12" rx="1" fill="#fbbf24" transform="rotate(-18 44 24)"/>
    <path d="M31 29 Q34 27 37 29" fill="none" stroke="#1a0a30" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M43 29 Q46 27 49 29" fill="none" stroke="#1a0a30" stroke-width="1.5" stroke-linecap="round"/>
    <ellipse cx="34" cy="35" rx="3.5" ry="3.5" fill="#fff"/>
    <ellipse cx="46" cy="35" rx="3.5" ry="3.5" fill="#fff"/>
    <circle cx="35" cy="35.4" r="2.3" fill="#2d0a5a"/>
    <circle cx="47" cy="35.4" r="2.3" fill="#2d0a5a"/>
    <circle cx="35.8" cy="34.6" r=".8" fill="#fff"/>
    <circle cx="47.8" cy="34.6" r=".8" fill="#fff"/>
    <path d="M39 42 Q40 45 41 42" fill="none" stroke="#c8a07a" stroke-width="1.2"/>
    <path d="M34 48.5 Q40 54 46 48.5" fill="none" stroke="#a07840" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  reviewer: (p) => `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="${p}g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#064e3b"/><stop offset="100%" stop-color="#059669"/>
      </linearGradient>
      <clipPath id="${p}c"><circle cx="40" cy="40" r="40"/></clipPath>
    </defs>
    <circle cx="40" cy="40" r="40" fill="url(#${p}g)"/>
    <ellipse cx="40" cy="82" rx="28" ry="16" fill="#022c22" clip-path="url(#${p}c)"/>
    <ellipse cx="40" cy="79" rx="16" ry="11" fill="#d1fae5" clip-path="url(#${p}c)"/>
    <rect x="36" y="57" width="8" height="10" rx="3" fill="#f5b887" clip-path="url(#${p}c)"/>
    <ellipse cx="40" cy="38" rx="16" ry="18" fill="#f5b887"/>
    <ellipse cx="24.5" cy="38" rx="3.5" ry="5" fill="#eda060"/>
    <ellipse cx="55.5" cy="38" rx="3.5" ry="5" fill="#eda060"/>
    <ellipse cx="40" cy="22" rx="17" ry="11" fill="#3a2005"/>
    <rect x="24" y="20" width="32" height="7" fill="#3a2005"/>
    <ellipse cx="40" cy="19" rx="17" ry="5" fill="#2d1800"/>
    <path d="M31 28 Q34 26.5 37 28.5" fill="none" stroke="#3a2005" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M43 28 Q46 26.5 49 28.5" fill="none" stroke="#3a2005" stroke-width="1.5" stroke-linecap="round"/>
    <ellipse cx="34" cy="36" rx="4" ry="3" fill="#fff"/>
    <ellipse cx="46" cy="36" rx="4" ry="3" fill="#fff"/>
    <circle cx="34.5" cy="36.3" r="2.4" fill="#1a3a1a"/>
    <circle cx="46.5" cy="36.3" r="2.4" fill="#1a3a1a"/>
    <circle cx="35.3" cy="35.5" r=".8" fill="#fff"/>
    <circle cx="47.3" cy="35.5" r=".8" fill="#fff"/>
    <rect x="29.5" y="33.5" width="9" height="5.5" rx="2.5" fill="none" stroke="#5a3a10" stroke-width="1.2"/>
    <rect x="41.5" y="33.5" width="9" height="5.5" rx="2.5" fill="none" stroke="#5a3a10" stroke-width="1.2"/>
    <line x1="38.5" y1="36.2" x2="41.5" y2="36.2" stroke="#5a3a10" stroke-width="1.2"/>
    <line x1="27" y1="35.5" x2="29.5" y2="35.5" stroke="#5a3a10" stroke-width="1"/>
    <line x1="50.5" y1="35.5" x2="53" y2="35.5" stroke="#5a3a10" stroke-width="1"/>
    <path d="M39 42 Q40 45 41 42" fill="none" stroke="#c08050" stroke-width="1.2"/>
    <path d="M35 48 L40 51 L45 48" fill="none" stroke="#8a4a10" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="58" cy="22" r="6" fill="none" stroke="#a7f3d0" stroke-width="1.2"/>
    <circle cx="58" cy="22" r="2.5" fill="none" stroke="#a7f3d0" stroke-width="1.2"/>
    <line x1="62.5" y1="26.5" x2="66" y2="30" stroke="#a7f3d0" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  designer: (p) => `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="${p}g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#7f1d1d"/><stop offset="100%" stop-color="#ef4444"/>
      </linearGradient>
      <clipPath id="${p}c"><circle cx="40" cy="40" r="40"/></clipPath>
    </defs>
    <circle cx="40" cy="40" r="40" fill="url(#${p}g)"/>
    <ellipse cx="40" cy="82" rx="28" ry="16" fill="#450a0a" clip-path="url(#${p}c)"/>
    <ellipse cx="40" cy="79" rx="16" ry="11" fill="#fce7c8" clip-path="url(#${p}c)"/>
    <rect x="36" y="57" width="8" height="10" rx="3" fill="#fce7c8" clip-path="url(#${p}c)"/>
    <ellipse cx="40" cy="38" rx="16" ry="18" fill="#fce7c8"/>
    <ellipse cx="24.5" cy="38" rx="3.5" ry="5" fill="#f5d0a8"/>
    <ellipse cx="55.5" cy="38" rx="3.5" ry="5" fill="#f5d0a8"/>
    <ellipse cx="40" cy="20" rx="18" ry="12" fill="#1a0505"/>
    <path d="M22 24 Q30 12 40 15 Q50 18 52 10 L58 14 Q56 22 48 22 Q38 24 28 28 Z" fill="#9333ea"/>
    <path d="M24 18 Q32 8 40 13" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M31 28 Q34 26 37 28.5" fill="none" stroke="#1a0505" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M43 28 Q46 26 49 28.5" fill="none" stroke="#1a0505" stroke-width="1.5" stroke-linecap="round"/>
    <ellipse cx="34" cy="35" rx="3.5" ry="3.5" fill="#fff"/>
    <ellipse cx="46" cy="35" rx="3.5" ry="3.5" fill="#fff"/>
    <circle cx="34.8" cy="35.3" r="2.4" fill="#4a0505"/>
    <circle cx="46.8" cy="35.3" r="2.4" fill="#4a0505"/>
    <circle cx="35.6" cy="34.5" r=".9" fill="#fff"/>
    <circle cx="47.6" cy="34.5" r=".9" fill="#fff"/>
    <path d="M39 42 Q40 45 41 42" fill="none" stroke="#d4a070" stroke-width="1.2"/>
    <path d="M33 47 Q40 54.5 47 47" fill="none" stroke="#a05030" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="60" cy="28" r="7" fill="#1a0505" opacity=".85"/>
    <circle cx="60" cy="28" r="4.5" fill="none" stroke="#fbbf24" stroke-width="1"/>
    <circle cx="57" cy="25.5" r="1.2" fill="#ef4444"/>
    <circle cx="60.5" cy="24.5" r="1.2" fill="#22d3ee"/>
    <circle cx="63" cy="27" r="1.2" fill="#a3e635"/>
    <circle cx="58.5" cy="30.5" r="1.2" fill="#f472b6"/>
  </svg>`,

  researcher: (p) => `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="${p}g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#14532d"/><stop offset="100%" stop-color="#16a34a"/>
      </linearGradient>
      <clipPath id="${p}c"><circle cx="40" cy="40" r="40"/></clipPath>
    </defs>
    <circle cx="40" cy="40" r="40" fill="url(#${p}g)"/>
    <ellipse cx="40" cy="82" rx="28" ry="16" fill="#052e16" clip-path="url(#${p}c)"/>
    <ellipse cx="40" cy="79" rx="16" ry="11" fill="#dcfce7" clip-path="url(#${p}c)"/>
    <rect x="36" y="57" width="8" height="10" rx="3" fill="#fbbf7c" clip-path="url(#${p}c)"/>
    <ellipse cx="40" cy="38" rx="16" ry="18" fill="#fbbf7c"/>
    <ellipse cx="24.5" cy="38" rx="3.5" ry="5" fill="#f0a850"/>
    <ellipse cx="55.5" cy="38" rx="3.5" ry="5" fill="#f0a850"/>
    <ellipse cx="40" cy="21" rx="17" ry="11" fill="#4a3010"/>
    <rect x="24" y="19" width="32" height="8" fill="#4a3010"/>
    <ellipse cx="40" cy="18" rx="17.5" ry="5" fill="#3a2208"/>
    <path d="M31 28.5 Q34 26.5 37 29" fill="none" stroke="#4a3010" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M43 28.5 Q46 26.5 49 29" fill="none" stroke="#4a3010" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="34" cy="35" r="4" fill="none" stroke="#4a3010" stroke-width="1.3"/>
    <circle cx="46" cy="35" r="4" fill="none" stroke="#4a3010" stroke-width="1.3"/>
    <line x1="38" y1="35" x2="42" y2="35" stroke="#4a3010" stroke-width="1.3"/>
    <line x1="27" y1="35" x2="30" y2="35" stroke="#4a3010" stroke-width="1"/>
    <line x1="50" y1="35" x2="53" y2="35" stroke="#4a3010" stroke-width="1"/>
    <ellipse cx="34" cy="35" rx="2.5" ry="2.5" fill="#2a1800"/>
    <ellipse cx="46" cy="35" rx="2.5" ry="2.5" fill="#2a1800"/>
    <circle cx="34.7" cy="34.2" r=".8" fill="#fff"/>
    <circle cx="46.7" cy="34.2" r=".8" fill="#fff"/>
    <path d="M39 42 Q40 45 41 42" fill="none" stroke="#c08040" stroke-width="1.2"/>
    <path d="M36 48.5 L40 51 L44 48.5" fill="none" stroke="#7a4a10" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="10" y="56" width="14" height="18" rx="1.5" fill="#bbf7d0" clip-path="url(#${p}c)"/>
    <rect x="12" y="54" width="14" height="18" rx="1.5" fill="#86efac" clip-path="url(#${p}c)"/>
    <rect x="14" y="52" width="14" height="18" rx="1.5" fill="#4ade80" clip-path="url(#${p}c)"/>
    <line x1="16" y1="58" x2="26" y2="58" stroke="#fff" stroke-width=".8" opacity=".5"/>
    <line x1="16" y1="61" x2="26" y2="61" stroke="#fff" stroke-width=".8" opacity=".5"/>
    <line x1="16" y1="64" x2="22" y2="64" stroke="#fff" stroke-width=".8" opacity=".5"/>
  </svg>`,

  default: (p) => `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="${p}g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e3a5f"/><stop offset="100%" stop-color="#2563eb"/>
      </linearGradient>
      <clipPath id="${p}c"><circle cx="40" cy="40" r="40"/></clipPath>
    </defs>
    <circle cx="40" cy="40" r="40" fill="url(#${p}g)"/>
    <ellipse cx="40" cy="82" rx="28" ry="16" fill="#0f1f3d" clip-path="url(#${p}c)"/>
    <ellipse cx="40" cy="79" rx="16" ry="11" fill="#e0e7ff" clip-path="url(#${p}c)"/>
    <rect x="36" y="57" width="8" height="10" rx="3" fill="#c8b8f8" clip-path="url(#${p}c)"/>
    <ellipse cx="40" cy="38" rx="16" ry="18" fill="#c8b8f8"/>
    <ellipse cx="24.5" cy="38" rx="3.5" ry="5" fill="#b8a0e8"/>
    <ellipse cx="55.5" cy="38" rx="3.5" ry="5" fill="#b8a0e8"/>
    <ellipse cx="40" cy="21" rx="17" ry="10" fill="#1e2a3a"/>
    <rect x="24" y="19" width="32" height="8" fill="#1e2a3a"/>
    <ellipse cx="40" cy="18" rx="17" ry="5" fill="#151f2e"/>
    <path d="M26 24 Q30 18 40 18 Q50 18 54 24" fill="none" stroke="#38bdf8" stroke-width="1" opacity=".6"/>
    <path d="M31 29 Q34 27 37 29.5" fill="none" stroke="#1e2a3a" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M43 29 Q46 27 49 29.5" fill="none" stroke="#1e2a3a" stroke-width="1.5" stroke-linecap="round"/>
    <ellipse cx="34" cy="35.5" rx="3.5" ry="3.5" fill="#fff"/>
    <ellipse cx="46" cy="35.5" rx="3.5" ry="3.5" fill="#fff"/>
    <circle cx="34.8" cy="35.8" r="2.4" fill="#1e2a3a"/>
    <circle cx="46.8" cy="35.8" r="2.4" fill="#1e2a3a"/>
    <circle cx="35.6" cy="35" r=".85" fill="#38bdf8"/>
    <circle cx="47.6" cy="35" r=".85" fill="#38bdf8"/>
    <path d="M39 42.5 Q40 45 41 42.5" fill="none" stroke="#a090d0" stroke-width="1.2"/>
    <path d="M34 48.5 Q40 54 46 48.5" fill="none" stroke="#7060a8" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="58" cy="16" r="3" fill="none" stroke="#38bdf8" stroke-width="1" opacity=".7"/>
    <circle cx="64" cy="22" r="2" fill="none" stroke="#38bdf8" stroke-width="1" opacity=".5"/>
    <line x1="60" y1="18" x2="63" y2="21" stroke="#38bdf8" stroke-width=".8" opacity=".5"/>
  </svg>`,
};

function getAgentAvatar(agentId) {
  const type = getAvatarType(agentId);
  const p    = 'av_' + (agentId || 'x').replace(/[^a-z0-9]/gi, '') + '_';
  return (AVATARS[type] || AVATARS.default)(p);
}

// ── Squad State ──────────────────────────────────────────────────────────────

const $squadEmpty       = document.getElementById('squadEmpty');
const $squadActive      = document.getElementById('squadActive');
const $squadName        = document.getElementById('squadName');
const $squadStepLabel   = document.getElementById('squadStepLabel');
const $squadStepCounter = document.getElementById('squadStepCounter');
const $progressFill     = document.getElementById('progressFill');
const $agentsGrid       = document.getElementById('agentsGrid');

let lastHandoff = null;

function handleState(data) {
  if (!data || data.status === 'completed') {
    showEmptySquad();
    return;
  }

  showActiveSquad();

  $squadName.textContent = data.squad || '—';

  const { current = 0, total = 0, label = '' } = data.step || {};
  $squadStepLabel.textContent = label;
  $squadStepCounter.textContent = `${current} / ${total}`;
  $progressFill.style.width = total > 0 ? `${(current / total) * 100}%` : '0%';

  renderAgents(data.agents || []);
  highlightActiveSquad(data.squad);

  // Handoff: dispara animação apenas quando muda
  if (data.handoff && JSON.stringify(data.handoff) !== JSON.stringify(lastHandoff)) {
    lastHandoff = data.handoff;
    triggerHandoff(data.handoff);
  }
}

function showEmptySquad() {
  $squadEmpty.classList.remove('hidden');
  $squadActive.classList.add('hidden');
  lastHandoff = null;
}

function showActiveSquad() {
  $squadEmpty.classList.add('hidden');
  $squadActive.classList.remove('hidden');
}

// ── Render agents ─────────────────────────────────────────────────────────────

const STATUS_LABELS = { working: 'Trabalhando...', done: 'Concluído', idle: 'Aguardando' };

function renderAgents(agents) {
  const maxCol = agents.reduce((m, a) => Math.max(m, a.col || 1), 2);
  $agentsGrid.style.gridTemplateColumns = `repeat(${maxCol}, minmax(148px, 1fr))`;

  const existing = {};
  $agentsGrid.querySelectorAll('.agent-card').forEach((el) => { existing[el.dataset.id] = el; });
  const newIds = new Set(agents.map((a) => a.id));
  Object.keys(existing).forEach((id) => { if (!newIds.has(id)) existing[id].remove(); });

  agents.forEach((agent) => {
    const status  = agent.status || 'idle';
    const label   = STATUS_LABELS[status] || status;
    const spinner = status === 'working' ? '<span class="spinner"></span>' : '';
    const col     = agent.col || 1;
    const row     = agent.row || 1;

    if (existing[agent.id]) {
      const card = existing[agent.id];
      card.className        = `agent-card ${status}`;
      card.style.gridColumn = col;
      card.style.gridRow    = row;
      card.querySelector('.agent-name').textContent        = agent.name || agent.id;
      card.querySelector('.agent-status-text').className   = `agent-status-text ${status}`;
      card.querySelector('.agent-status-text').innerHTML   = `${spinner}${label}`;
    } else {
      const card = document.createElement('div');
      card.className        = `agent-card ${status}`;
      card.dataset.id       = agent.id;
      card.style.gridColumn = col;
      card.style.gridRow    = row;
      card.innerHTML = `
        <div class="agent-avatar-wrap">
          <div class="agent-avatar-ring"></div>
          ${getAgentAvatar(agent.id)}
          <span class="agent-status-pip"></span>
        </div>
        <span class="agent-name">${agent.name || agent.id}</span>
        <span class="agent-status-text ${status}">${spinner}${label}</span>`;
      $agentsGrid.appendChild(card);
    }
  });
}

// ── Handoff animation ─────────────────────────────────────────────────────────

function triggerHandoff(handoff) {
  const { from, to, message } = handoff;

  // Pisca card de origem
  const fromCard = $agentsGrid.querySelector(`[data-id="${from}"]`);
  if (fromCard) {
    fromCard.classList.add('handoff-out');
    setTimeout(() => fromCard.classList.remove('handoff-out'), 800);
  }

  // Pisca card de destino
  const toCard = $agentsGrid.querySelector(`[data-id="${to}"]`);
  if (toCard) {
    toCard.classList.add('handoff-in');
    setTimeout(() => toCard.classList.remove('handoff-in'), 1200);
  }

  // Toast de handoff
  showHandoffToast(from, to, message);
}

let toastTimeout = null;

function showHandoffToast(from, to, message) {
  let toast = document.getElementById('handoffToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'handoffToast';
    toast.className = 'handoff-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="toast-from">${from}</span>
    <span class="toast-arrow">→</span>
    <span class="toast-to">${to}</span>
    ${message ? `<span class="toast-msg">${message}</span>` : ''}`;

  toast.classList.add('visible');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('visible'), 3500);
}

// ── History (sidebar) ────────────────────────────────────────────────────────

const $projectList = document.getElementById('projectList');
let activeSquadName = null;

function handleHistory(squads) {
  const $badge = document.getElementById('projectCount');
  if ($badge) $badge.textContent = squads ? squads.length : 0;

  if (!squads || squads.length === 0) {
    $projectList.innerHTML = '<p class="sidebar-empty">Nenhum projeto ainda.</p>';
    return;
  }

  $projectList.innerHTML = squads.map((squad) => {
    const isActive = squad.name === activeSquadName;

    const runs = squad.runs.map((run) => {
      const files = run.files.map((f) => {
        const name = f.split('/').pop();
        const enc  = encodeURIComponent(`${squad.name}/output/${run.id}/${f}`);
        return `<div class="file-item" onclick="openFile('${enc}','${name}')" title="${f}">
          <span class="file-icon">${fileIcon(name)}</span>
          <span class="file-name">${name}</span>
        </div>`;
      }).join('');

      return `
        <div class="run-item" onclick="toggleRun(this)">
          <span class="run-item-dot ${isActive ? 'active' : ''}"></span>
          <span>${run.id}</span>
          <span class="run-count">${run.files.length} arq.</span>
          <span class="run-toggle">▶</span>
        </div>
        <div class="file-list">${files || '<div class="file-item muted">Sem arquivos</div>'}</div>`;
    }).join('');

    return `
      <div class="project-item ${isActive ? 'project-active' : ''}" data-squad="${squad.name}">
        <div class="project-header" onclick="toggleProject(this)">
          <span class="project-icon">${isActive ? '▶' : '📁'}</span>
          <span class="project-name">${squad.name}</span>
          <span class="project-toggle">▶</span>
        </div>
        <div class="project-runs">${runs || '<div class="run-item muted">Sem execuções</div>'}</div>
      </div>`;
  }).join('');

  // Reabre o squad ativo automaticamente
  if (activeSquadName) {
    const activeItem = $projectList.querySelector(`[data-squad="${activeSquadName}"] .project-header`);
    if (activeItem) openProject(activeItem);
  }
}

function highlightActiveSquad(name) {
  activeSquadName = name;
  // Re-renderiza se já tiver histórico
  const items = $projectList.querySelectorAll('.project-item');
  items.forEach((item) => {
    const isActive = item.dataset.squad === name;
    item.classList.toggle('project-active', isActive);
    item.querySelector('.project-icon').textContent = isActive ? '▶' : '📁';
  });
}

function toggleProject(header) {
  const isOpen = header.nextElementSibling.classList.contains('open');
  if (isOpen) closeProject(header); else openProject(header);
}
function openProject(header) {
  header.nextElementSibling.classList.add('open');
  header.querySelector('.project-toggle').classList.add('open');
  header.classList.add('active');
}
function closeProject(header) {
  header.nextElementSibling.classList.remove('open');
  header.querySelector('.project-toggle').classList.remove('open');
  header.classList.remove('active');
}

function toggleRun(runEl) {
  const fileList = runEl.nextElementSibling;
  const toggle   = runEl.querySelector('.run-toggle');
  const isOpen   = fileList.classList.toggle('open');
  if (toggle) toggle.classList.toggle('open', isOpen);
}

function fileIcon(name) {
  if (name.endsWith('.md'))   return '📄';
  if (name.endsWith('.csv'))  return '📊';
  if (name.endsWith('.json')) return '🗂️';
  if (name.endsWith('.html')) return '🌐';
  return '📎';
}

// ── File Viewer ───────────────────────────────────────────────────────────────

function openFile(encodedPath, name) {
  fetch(`/api/file?path=${encodedPath}`)
    .then((r) => r.text())
    .then((content) => showFileModal(name, content))
    .catch(() => showFileModal(name, '(erro ao carregar arquivo)'));
}

function showFileModal(name, content) {
  let modal = document.getElementById('fileModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'fileModal';
    modal.className = 'file-modal';
    modal.innerHTML = `
      <div class="file-modal-box">
        <div class="file-modal-header">
          <span class="file-modal-name" id="fileModalName"></span>
          <button class="file-modal-close" onclick="closeFileModal()">✕</button>
        </div>
        <pre class="file-modal-content" id="fileModalContent"></pre>
      </div>`;
    modal.addEventListener('click', (e) => { if (e.target === modal) closeFileModal(); });
    document.body.appendChild(modal);
  }
  document.getElementById('fileModalName').textContent    = name;
  document.getElementById('fileModalContent').textContent = content;
  modal.classList.add('open');
}

function closeFileModal() {
  document.getElementById('fileModal')?.classList.remove('open');
}

// ── Chat Input ───────────────────────────────────────────────────────────────

const $chatInput = document.getElementById('chatInput');
const $chatSend  = document.getElementById('chatSend');

function setInputEnabled(enabled) {
  $chatInput.disabled = !enabled;
  $chatSend.disabled  = !enabled;
  document.querySelectorAll('.cmd-chip').forEach((c) => { c.disabled = !enabled; });
}

function submitInput() {
  const text = $chatInput.value;
  if (!text.trim()) return;
  send('input', { text: text + '\n' });
  $chatInput.value = '';
}

$chatSend.addEventListener('click', submitInput);
$chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') submitInput();
});

// ── Command chips ─────────────────────────────────────────────────────────────

document.getElementById('cmdChips').addEventListener('click', (e) => {
  const chip = e.target.closest('.cmd-chip');
  if (!chip || chip.disabled) return;

  const cmd    = chip.dataset.cmd;
  const doSend = chip.dataset.send === 'true';

  if (doSend) {
    // Envia direto para o PTY
    send('input', { text: cmd + '\n' });
  } else {
    // Coloca no input para o usuário completar
    $chatInput.value = cmd;
    $chatInput.focus();
    $chatInput.setSelectionRange(cmd.length, cmd.length);
  }
});

// ── Init ─────────────────────────────────────────────────────────────────────

setInputEnabled(false);
connect();
