// Lightweave Theme Engine
// Module-level store: applies CSS variables to DOM + persists to localStorage.
// No React dependencies — framework-agnostic.

import { themes } from '../themes/index.js';

// ── CSS Variable Mapping (all 28 color keys) ─────────────────────────────
const COLOR_MAP = {
  backgroundPrimary:    '--lw-bg-primary',
  backgroundSecondary:  '--lw-bg-secondary',
  backgroundTertiary:   '--lw-bg-tertiary',
  backgroundCard:       '--lw-bg-card',
  textPrimary:          '--lw-text-primary',
  textSecondary:        '--lw-text-secondary',
  textMuted:            '--lw-text-muted',
  borderDefault:        '--lw-border',
  borderLight:          '--lw-border-light',
  accentPrimary:        '--lw-accent',
  accentPrimaryHover:   '--lw-accent-hover',
  accentSecondary:      '--lw-accent-secondary',
  accentBackground:     '--lw-accent-bg',
  accentBorder:         '--lw-accent-border',
  buttonText:           '--lw-button-text',
  sidebarBackground:    '--lw-sidebar-bg',
  sidebarText:          '--lw-sidebar-text',
  sidebarTextMuted:     '--lw-sidebar-text-muted',
  sidebarAccent:        '--lw-sidebar-accent',
  sidebarAccentText:    '--lw-sidebar-accent-text',
  sidebarBorder:        '--lw-sidebar-border',
  success:              '--lw-success',
  successBackground:    '--lw-success-bg',
  error:                '--lw-error',
  errorBackground:      '--lw-error-bg',
  warning:              '--lw-warning',
  warningBackground:    '--lw-warning-bg',
  overlayBackdrop:      '--lw-overlay',
};

const ALL_VARS = Object.values(COLOR_MAP);

// ── Apply / Clear ─────────────────────────────────────────────────────────

export function applyTheme(theme) {
  if (!theme?.colors) return;
  const root = document.documentElement;
  clearTheme();
  for (const [colorKey, cssVar] of Object.entries(COLOR_MAP)) {
    if (theme.colors[colorKey]) {
      root.style.setProperty(cssVar, theme.colors[colorKey]);
    }
  }
}

export function clearTheme() {
  const root = document.documentElement;
  for (const v of ALL_VARS) {
    root.style.removeProperty(v);
  }
}

// ── Theme Lookup ──────────────────────────────────────────────────────────

const DEFAULT_THEME = 'default';

export function getTheme(id) {
  return themes[id] || themes[DEFAULT_THEME];
}

// ── Custom Theme Storage ──────────────────────────────────────────────────

const CUSTOM_THEMES_KEY = 'lw_custom_themes';

function loadCustomThemes() {
  try {
    const saved = localStorage.getItem(CUSTOM_THEMES_KEY);
    if (!saved) return;
    const list = JSON.parse(saved);
    for (const t of list) {
      if (t && t.id) themes[t.id] = t;
    }
  } catch { /* ignore corrupt data */ }
}

function persistCustomThemes() {
  const list = Object.values(themes).filter(t => t.isCustom);
  localStorage.setItem(CUSTOM_THEMES_KEY, JSON.stringify(list));
}

// Load custom themes into registry BEFORE currentId resolves
loadCustomThemes();

export function getCustomThemes() {
  try {
    const saved = localStorage.getItem(CUSTOM_THEMES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}

export function saveCustomTheme(theme) {
  const id = (theme.id && theme.id !== 'custom' && theme.id.startsWith('custom-'))
    ? theme.id
    : `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const saved = { ...theme, id, isCustom: true };
  themes[id] = saved;
  persistCustomThemes();
  currentId = id;
  localStorage.setItem(THEME_KEY, id);
  applyTheme(saved);
  return id;
}

export function deleteCustomTheme(id) {
  if (!themes[id]?.isCustom) return;
  delete themes[id];
  persistCustomThemes();
  if (currentId === id) {
    currentId = DEFAULT_THEME;
    localStorage.setItem(THEME_KEY, DEFAULT_THEME);
    applyTheme(themes[DEFAULT_THEME]);
  }
}

// ── Theme Export / Import ─────────────────────────────────────────────────

export function exportTheme(theme) {
  const { isCustom, ...clean } = theme;
  return JSON.stringify(clean, null, 2);
}

export function importTheme(json) {
  const parsed = JSON.parse(json);
  if (!parsed.name || !parsed.colors) {
    throw new Error('Invalid theme: must have "name" and "colors"');
  }
  return parsed;
}

// ── Module-level Theme State ──────────────────────────────────────────────

const THEME_KEY = 'lw_theme';

let currentId = (() => {
  const saved = localStorage.getItem(THEME_KEY);
  return saved && themes[saved] ? saved : DEFAULT_THEME;
})();

// Apply on module load — no flash
applyTheme(getTheme(currentId));

export function getThemeId() { return currentId; }

export function setThemeId(id) {
  if (!themes[id] || id === currentId) return;
  currentId = id;
  localStorage.setItem(THEME_KEY, id);
  applyTheme(getTheme(id));
}
