// Lightweave Tailwind Preset — ~20-color schema
// Maps to common Tailwind CSS color categories

export default {
  name: 'Tailwind Colors',
  version: 'lightweave-tailwind-v1',
  prefix: '--tw',
  storageKey: 'lw_tw',
  defaultTheme: 'default',

  groups: [
    {
      id: 'backgrounds',
      label: 'Backgrounds',
      description: 'Page and surface backgrounds',
      colors: [
        { key: 'bgBase', cssVar: '--tw-bg-base', label: 'Base', description: 'Page background (bg-white/bg-gray-950)', default: '#ffffff' },
        { key: 'bgMuted', cssVar: '--tw-bg-muted', label: 'Muted', description: 'Subtle background (bg-gray-50/bg-gray-900)', default: '#f9fafb' },
        { key: 'bgCard', cssVar: '--tw-bg-card', label: 'Card', description: 'Card surfaces', default: '#ffffff' },
        { key: 'bgPopover', cssVar: '--tw-bg-popover', label: 'Popover', description: 'Popover/dropdown background', default: '#ffffff' },
      ]
    },
    {
      id: 'foreground',
      label: 'Foreground',
      description: 'Text and icon colors',
      colors: [
        { key: 'fgDefault', cssVar: '--tw-fg-default', label: 'Default', description: 'Primary text (text-gray-900)', default: '#111827' },
        { key: 'fgMuted', cssVar: '--tw-fg-muted', label: 'Muted', description: 'Secondary text (text-gray-500)', default: '#6b7280' },
        { key: 'fgInverse', cssVar: '--tw-fg-inverse', label: 'Inverse', description: 'Text on dark surfaces', default: '#f9fafb' },
      ]
    },
    {
      id: 'primary',
      label: 'Primary',
      description: 'Primary brand/action color',
      colors: [
        { key: 'primary', cssVar: '--tw-primary', label: 'Primary', description: 'Primary action (blue-600)', default: '#2563eb' },
        { key: 'primaryHover', cssVar: '--tw-primary-hover', label: 'Primary Hover', description: 'Hover state (blue-700)', default: '#1d4ed8' },
        { key: 'primaryFg', cssVar: '--tw-primary-fg', label: 'Primary Foreground', description: 'Text on primary', default: '#ffffff' },
      ]
    },
    {
      id: 'borders',
      label: 'Borders',
      description: 'Border and ring colors',
      colors: [
        { key: 'border', cssVar: '--tw-border', label: 'Border', description: 'Default border (border-gray-200)', default: '#e5e7eb' },
        { key: 'ring', cssVar: '--tw-ring', label: 'Ring', description: 'Focus ring color', default: '#3b82f6' },
        { key: 'input', cssVar: '--tw-input', label: 'Input Border', description: 'Input field borders', default: '#d1d5db' },
      ]
    },
    {
      id: 'status',
      label: 'Status',
      description: 'Semantic colors',
      colors: [
        { key: 'success', cssVar: '--tw-success', label: 'Success', description: 'Success (green-600)', default: '#16a34a' },
        { key: 'successBg', cssVar: '--tw-success-bg', label: 'Success Background', description: 'Success surface (green-50)', default: '#f0fdf4' },
        { key: 'destructive', cssVar: '--tw-destructive', label: 'Destructive', description: 'Destructive/error (red-600)', default: '#dc2626' },
        { key: 'destructiveBg', cssVar: '--tw-destructive-bg', label: 'Destructive Background', description: 'Error surface (red-50)', default: '#fef2f2' },
        { key: 'warning', cssVar: '--tw-warning', label: 'Warning', description: 'Warning (amber-500)', default: '#f59e0b' },
        { key: 'warningBg', cssVar: '--tw-warning-bg', label: 'Warning Background', description: 'Warning surface (amber-50)', default: '#fffbeb' },
      ]
    },
  ],
};
