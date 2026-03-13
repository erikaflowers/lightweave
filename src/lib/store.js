// Lightweave Theme Engine
// Module-level store: applies CSS variables to DOM + persists to localStorage.
// No React dependencies — framework-agnostic.
// ALL mappings derived from schema — no hardcoded color keys.

import { themes } from '../themes/index.js';
import { getSchema, getColorMap, getAllVars, getStorageKeys } from './schema.js';

// ── Schema-Derived Configuration ─────────────────────────────────────────

const schema = getSchema();
const COLOR_MAP = getColorMap(schema);
const ALL_VARS = getAllVars(schema);
const STORAGE = getStorageKeys(schema);

// Re-export schema for consumers that need it
export { schema };

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

const DEFAULT_THEME = schema.defaultTheme || 'default';

export function getTheme(id) {
  return themes[id] || themes[DEFAULT_THEME];
}

// ── Custom Theme Storage ──────────────────────────────────────────────────

function loadCustomThemes() {
  try {
    const saved = localStorage.getItem(STORAGE.customThemes);
    if (!saved) return;
    const list = JSON.parse(saved);
    for (const t of list) {
      if (t && t.id) themes[t.id] = t;
    }
  } catch { /* ignore corrupt data */ }
}

function persistCustomThemes() {
  const list = Object.values(themes).filter(t => t.isCustom);
  localStorage.setItem(STORAGE.customThemes, JSON.stringify(list));
}

// Load custom themes into registry BEFORE currentId resolves
loadCustomThemes();

export function getCustomThemes() {
  try {
    const saved = localStorage.getItem(STORAGE.customThemes);
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
  localStorage.setItem(STORAGE.theme, id);
  applyTheme(saved);
  return id;
}

export function deleteCustomTheme(id) {
  if (!themes[id]?.isCustom) return;
  delete themes[id];
  persistCustomThemes();
  if (currentId === id) {
    currentId = DEFAULT_THEME;
    localStorage.setItem(STORAGE.theme, DEFAULT_THEME);
    applyTheme(themes[DEFAULT_THEME]);
  }
}

// ── Theme Export / Import ─────────────────────────────────────────────────

export function exportTheme(theme) {
  const { isCustom, ...clean } = theme;
  return JSON.stringify({ ...clean, schema: schema.version || 'unknown' }, null, 2);
}

export function importTheme(json) {
  const parsed = JSON.parse(json);
  if (!parsed.name || !parsed.colors) {
    throw new Error('Invalid theme: must have "name" and "colors"');
  }
  return parsed;
}

// ── Module-level Theme State ──────────────────────────────────────────────

let currentId = (() => {
  const saved = localStorage.getItem(STORAGE.theme);
  return saved && themes[saved] ? saved : DEFAULT_THEME;
})();

// Apply on module load — no flash
applyTheme(getTheme(currentId));

export function getThemeId() { return currentId; }

export function setThemeId(id) {
  if (!themes[id] || id === currentId) return;
  currentId = id;
  localStorage.setItem(STORAGE.theme, id);
  applyTheme(getTheme(id));
}

// ── Factory for Embedded Mode ─────────────────────────────────────────────

/**
 * Create an isolated store instance with a custom schema.
 * For embedding Lightweave components in other apps.
 */
export function createStore(customSchema) {
  const colorMap = getColorMap(customSchema);
  const allVars = Object.values(colorMap);
  const storage = getStorageKeys(customSchema);
  const defaultId = customSchema.defaultTheme || 'default';

  const localThemes = {};
  let localCurrentId = defaultId;

  function apply(theme) {
    if (!theme?.colors) return;
    const root = document.documentElement;
    for (const v of allVars) root.style.removeProperty(v);
    for (const [key, cssVar] of Object.entries(colorMap)) {
      if (theme.colors[key]) root.style.setProperty(cssVar, theme.colors[key]);
    }
  }

  function loadCustom() {
    try {
      const saved = localStorage.getItem(storage.customThemes);
      if (!saved) return;
      for (const t of JSON.parse(saved)) {
        if (t?.id) localThemes[t.id] = t;
      }
    } catch {}
  }

  function persistCustom() {
    const list = Object.values(localThemes).filter(t => t.isCustom);
    localStorage.setItem(storage.customThemes, JSON.stringify(list));
  }

  loadCustom();

  return {
    schema: customSchema,
    apply,
    getTheme: (id) => localThemes[id] || null,
    getCurrentId: () => localCurrentId,
    setCurrentId: (id) => {
      if (!localThemes[id]) return;
      localCurrentId = id;
      localStorage.setItem(storage.theme, id);
      apply(localThemes[id]);
    },
    registerTheme: (theme) => { localThemes[theme.id] = theme; },
    saveCustom: (theme) => {
      const id = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const saved = { ...theme, id, isCustom: true };
      localThemes[id] = saved;
      persistCustom();
      localCurrentId = id;
      localStorage.setItem(storage.theme, id);
      apply(saved);
      return id;
    },
    deleteCustom: (id) => {
      if (!localThemes[id]?.isCustom) return;
      delete localThemes[id];
      persistCustom();
      if (localCurrentId === id) {
        localCurrentId = defaultId;
        localStorage.setItem(storage.theme, defaultId);
      }
    },
    getCustomThemes: () => Object.values(localThemes).filter(t => t.isCustom),
  };
}
