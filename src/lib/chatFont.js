// Font preference — persists to localStorage, applies to --lw-font-chat CSS variable.

const CHAT_FONT_KEY = 'lw_chat_font';

export const CHAT_FONTS = [
  { id: 'serif', label: 'Serif',  family: "'Bookerly', Georgia, 'Times New Roman', serif" },
  { id: 'sans',  label: 'Sans',   family: "'Source Sans 3', 'Inter', -apple-system, sans-serif" },
  { id: 'mono',  label: 'Mono',   family: "'JetBrains Mono', 'Fira Code', monospace" },
];

export function getChatFont() {
  return localStorage.getItem(CHAT_FONT_KEY) || 'serif';
}

export function applyChatFont(id) {
  const font = CHAT_FONTS.find(f => f.id === id) || CHAT_FONTS[0];
  document.documentElement.style.setProperty('--lw-font-chat', font.family);
  localStorage.setItem(CHAT_FONT_KEY, id);
}

// Apply on module load
applyChatFont(getChatFont());
