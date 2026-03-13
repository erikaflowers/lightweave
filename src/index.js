// Lightweave — Public API
// Import individual components and utilities for embedded use.

// Schema
export { getSchema, setSchema, validateSchema, getColorMap, getAllVars, getDefaults, getColorKeys, getColorCount, getStorageKeys, getFlatColors } from './lib/schema.js';

// Store
export { applyTheme, clearTheme, getTheme, getThemeId, setThemeId, saveCustomTheme, deleteCustomTheme, getCustomThemes, exportTheme, importTheme, createStore } from './lib/store.js';

// React hook
export { default as useTheme } from './hooks/useTheme.js';

// Components
export { default as ThemeEditor } from './components/ThemeEditor/ThemeEditor.jsx';
export { default as ThemeBrowser } from './components/ThemeBrowser.jsx';
export { default as ThemeCard } from './components/ThemeCard.jsx';
export { default as ThemeGenerator } from './components/ThemeGenerator.jsx';
export { default as LivePreview } from './components/LivePreview.jsx';
export { default as FontPicker } from './components/FontPicker.jsx';

// Presets
export * as presets from './presets/index.js';
