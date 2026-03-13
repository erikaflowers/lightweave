// Lightweave Full Preset — 28-color schema
// The default schema matching Lightweave v1's complete color system

export default {
  name: 'Lightweave Full',
  version: 'lightweave-full-v1',
  prefix: '--lw',
  storageKey: 'lw',
  defaultTheme: 'default',

  groups: [
    {
      id: 'backgrounds',
      label: 'Backgrounds',
      description: 'Page and panel background colors',
      colors: [
        { key: 'backgroundPrimary', cssVar: '--lw-bg-primary', label: 'Primary Background', description: 'Main page background', default: '#F5EEE6' },
        { key: 'backgroundSecondary', cssVar: '--lw-bg-secondary', label: 'Secondary Background', description: 'Cards and panels', default: '#EDE6DC' },
        { key: 'backgroundTertiary', cssVar: '--lw-bg-tertiary', label: 'Tertiary Background', description: 'Nested elements', default: '#E5DDD2' },
        { key: 'backgroundCard', cssVar: '--lw-bg-card', label: 'Card Background', description: 'Elevated surfaces', default: '#FFFCF8' },
      ]
    },
    {
      id: 'text',
      label: 'Text',
      description: 'Typography colors',
      colors: [
        { key: 'textPrimary', cssVar: '--lw-text-primary', label: 'Primary Text', description: 'Main body text and headings', default: '#2C2416' },
        { key: 'textSecondary', cssVar: '--lw-text-secondary', label: 'Secondary Text', description: 'Subtitles and labels', default: '#5C5346' },
        { key: 'textMuted', cssVar: '--lw-text-muted', label: 'Muted Text', description: 'Placeholders and hints', default: '#8B7D6B' },
      ]
    },
    {
      id: 'borders',
      label: 'Borders',
      description: 'Lines and dividers',
      colors: [
        { key: 'borderDefault', cssVar: '--lw-border', label: 'Default Border', description: 'Standard borders', default: '#D9CFC2' },
        { key: 'borderLight', cssVar: '--lw-border-light', label: 'Light Border', description: 'Subtle dividers', default: '#E8E0D5' },
      ]
    },
    {
      id: 'accents',
      label: 'Accents',
      description: 'Interactive elements and highlights',
      colors: [
        { key: 'accentPrimary', cssVar: '--lw-accent', label: 'Primary Accent', description: 'Buttons and links', default: '#B85C38' },
        { key: 'accentPrimaryHover', cssVar: '--lw-accent-hover', label: 'Accent Hover', description: 'Hover state for accent', default: '#A04E2E' },
        { key: 'accentSecondary', cssVar: '--lw-accent-secondary', label: 'Secondary Accent', description: 'Secondary highlights', default: '#D4A574' },
        { key: 'accentBackground', cssVar: '--lw-accent-bg', label: 'Accent Background', description: 'Light accent fills', default: '#FFF5F0' },
        { key: 'accentBorder', cssVar: '--lw-accent-border', label: 'Accent Border', description: 'Accent-colored borders', default: '#FECACA' },
        { key: 'buttonText', cssVar: '--lw-button-text', label: 'Button Text', description: 'Text on accent buttons', default: '#FFFFFF' },
      ]
    },
    {
      id: 'sidebar',
      label: 'Sidebar',
      description: 'Navigation sidebar colors',
      colors: [
        { key: 'sidebarBackground', cssVar: '--lw-sidebar-bg', label: 'Sidebar Background', description: 'Main sidebar fill', default: '#2C2416' },
        { key: 'sidebarText', cssVar: '--lw-sidebar-text', label: 'Sidebar Text', description: 'Nav item labels', default: '#F5EEE6' },
        { key: 'sidebarTextMuted', cssVar: '--lw-sidebar-text-muted', label: 'Sidebar Muted', description: 'Inactive nav items', default: '#8B7D6B' },
        { key: 'sidebarAccent', cssVar: '--lw-sidebar-accent', label: 'Sidebar Accent', description: 'Active item highlight', default: '#B85C38' },
        { key: 'sidebarAccentText', cssVar: '--lw-sidebar-accent-text', label: 'Sidebar Accent Text', description: 'Active item text', default: '#ffffff' },
        { key: 'sidebarBorder', cssVar: '--lw-sidebar-border', label: 'Sidebar Border', description: 'Dividers in sidebar', default: '#3d3328' },
      ]
    },
    {
      id: 'status',
      label: 'Status',
      description: 'Feedback and state colors',
      colors: [
        { key: 'success', cssVar: '--lw-success', label: 'Success', description: 'Confirmations', default: '#4A7C59' },
        { key: 'successBackground', cssVar: '--lw-success-bg', label: 'Success Background', description: 'Success message fill', default: '#E8F5E9' },
        { key: 'error', cssVar: '--lw-error', label: 'Error', description: 'Errors and warnings', default: '#C45B4A' },
        { key: 'errorBackground', cssVar: '--lw-error-bg', label: 'Error Background', description: 'Error message fill', default: '#fef2f2' },
        { key: 'warning', cssVar: '--lw-warning', label: 'Warning', description: 'Cautions', default: '#D4A574' },
        { key: 'warningBackground', cssVar: '--lw-warning-bg', label: 'Warning Background', description: 'Warning message fill', default: '#FFF8E1' },
      ]
    },
    {
      id: 'overlay',
      label: 'Overlay',
      description: 'Modal and dialog backgrounds',
      colors: [
        { key: 'overlayBackdrop', cssVar: '--lw-overlay', label: 'Overlay Backdrop', description: 'Modal background overlay', default: 'rgba(44, 36, 22, 0.5)' },
      ]
    },
  ],
};
