/**
 * Color group definitions for the theme editor
 * Maps theme color keys to human-readable labels and descriptions
 */

export const COLOR_GROUPS = [
  {
    id: 'backgrounds',
    label: 'Backgrounds',
    description: 'Page and panel background colors',
    colors: [
      { key: 'backgroundPrimary', label: 'Primary Background', description: 'Main page background' },
      { key: 'backgroundSecondary', label: 'Secondary Background', description: 'Cards and panels' },
      { key: 'backgroundTertiary', label: 'Tertiary Background', description: 'Nested elements' },
      { key: 'backgroundCard', label: 'Card Background', description: 'Elevated surfaces' }
    ]
  },
  {
    id: 'text',
    label: 'Text',
    description: 'Typography colors',
    colors: [
      { key: 'textPrimary', label: 'Primary Text', description: 'Main body text and headings' },
      { key: 'textSecondary', label: 'Secondary Text', description: 'Subtitles and labels' },
      { key: 'textMuted', label: 'Muted Text', description: 'Placeholders and hints' }
    ]
  },
  {
    id: 'borders',
    label: 'Borders',
    description: 'Lines and dividers',
    colors: [
      { key: 'borderDefault', label: 'Default Border', description: 'Standard borders' },
      { key: 'borderLight', label: 'Light Border', description: 'Subtle dividers' }
    ]
  },
  {
    id: 'accents',
    label: 'Accents',
    description: 'Interactive elements and highlights',
    colors: [
      { key: 'accentPrimary', label: 'Primary Accent', description: 'Buttons and links' },
      { key: 'accentPrimaryHover', label: 'Accent Hover', description: 'Hover state for accent' },
      { key: 'accentSecondary', label: 'Secondary Accent', description: 'Secondary highlights' },
      { key: 'accentBackground', label: 'Accent Background', description: 'Light accent fills' },
      { key: 'accentBorder', label: 'Accent Border', description: 'Accent-colored borders' },
      { key: 'buttonText', label: 'Button Text', description: 'Text on accent buttons' }
    ]
  },
  {
    id: 'sidebar',
    label: 'Sidebar',
    description: 'Navigation sidebar colors',
    colors: [
      { key: 'sidebarBackground', label: 'Sidebar Background', description: 'Main sidebar fill' },
      { key: 'sidebarText', label: 'Sidebar Text', description: 'Nav item labels' },
      { key: 'sidebarTextMuted', label: 'Sidebar Muted', description: 'Inactive nav items' },
      { key: 'sidebarAccent', label: 'Sidebar Accent', description: 'Active item highlight' },
      { key: 'sidebarAccentText', label: 'Sidebar Accent Text', description: 'Active item text' },
      { key: 'sidebarBorder', label: 'Sidebar Border', description: 'Dividers in sidebar' }
    ]
  },
  {
    id: 'status',
    label: 'Status',
    description: 'Feedback and state colors',
    colors: [
      { key: 'success', label: 'Success', description: 'Confirmations' },
      { key: 'successBackground', label: 'Success Background', description: 'Success message fill' },
      { key: 'error', label: 'Error', description: 'Errors and warnings' },
      { key: 'errorBackground', label: 'Error Background', description: 'Error message fill' },
      { key: 'warning', label: 'Warning', description: 'Cautions' },
      { key: 'warningBackground', label: 'Warning Background', description: 'Warning message fill' }
    ]
  },
  {
    id: 'overlay',
    label: 'Overlay',
    description: 'Modal and dialog backgrounds',
    colors: [
      { key: 'overlayBackdrop', label: 'Overlay Backdrop', description: 'Modal background overlay' }
    ]
  }
];
