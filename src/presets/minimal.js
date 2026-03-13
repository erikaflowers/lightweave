// Lightweave Minimal Preset — 8-color schema
// A simple schema for basic sites and apps

export default {
  name: 'Lightweave Minimal',
  version: 'lightweave-minimal-v1',
  prefix: '--lw',
  storageKey: 'lw',
  defaultTheme: 'default',

  groups: [
    {
      id: 'backgrounds',
      label: 'Backgrounds',
      description: 'Page backgrounds',
      colors: [
        { key: 'bgPrimary', cssVar: '--lw-bg-primary', label: 'Primary', description: 'Main page background', default: '#ffffff' },
        { key: 'bgSecondary', cssVar: '--lw-bg-secondary', label: 'Secondary', description: 'Cards and panels', default: '#f5f5f5' },
      ]
    },
    {
      id: 'text',
      label: 'Text',
      description: 'Typography colors',
      colors: [
        { key: 'textPrimary', cssVar: '--lw-text-primary', label: 'Primary', description: 'Body text', default: '#1a1a1a' },
        { key: 'textMuted', cssVar: '--lw-text-muted', label: 'Muted', description: 'Secondary text', default: '#666666' },
      ]
    },
    {
      id: 'accents',
      label: 'Accents',
      description: 'Interactive elements',
      colors: [
        { key: 'accent', cssVar: '--lw-accent', label: 'Accent', description: 'Buttons and links', default: '#3b82f6' },
        { key: 'accentHover', cssVar: '--lw-accent-hover', label: 'Accent Hover', description: 'Hover state', default: '#2563eb' },
      ]
    },
    {
      id: 'borders',
      label: 'Borders',
      description: 'Lines and dividers',
      colors: [
        { key: 'border', cssVar: '--lw-border', label: 'Border', description: 'Default borders', default: '#e5e5e5' },
        { key: 'borderLight', cssVar: '--lw-border-light', label: 'Light Border', description: 'Subtle dividers', default: '#f0f0f0' },
      ]
    },
  ],
};
