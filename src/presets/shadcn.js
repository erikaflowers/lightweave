// Lightweave shadcn/ui Preset — ~15-color schema
// Maps to shadcn/ui's CSS variable system

export default {
  name: 'shadcn/ui',
  version: 'lightweave-shadcn-v1',
  prefix: '--shadcn',
  storageKey: 'lw_shadcn',
  defaultTheme: 'default',

  groups: [
    {
      id: 'base',
      label: 'Base',
      description: 'Core background and foreground',
      colors: [
        { key: 'background', cssVar: '--shadcn-background', label: 'Background', description: 'Page background', default: '#ffffff' },
        { key: 'foreground', cssVar: '--shadcn-foreground', label: 'Foreground', description: 'Default text', default: '#0a0a0a' },
        { key: 'card', cssVar: '--shadcn-card', label: 'Card', description: 'Card background', default: '#ffffff' },
        { key: 'cardForeground', cssVar: '--shadcn-card-foreground', label: 'Card Foreground', description: 'Card text', default: '#0a0a0a' },
      ]
    },
    {
      id: 'interactive',
      label: 'Interactive',
      description: 'Primary and secondary actions',
      colors: [
        { key: 'primary', cssVar: '--shadcn-primary', label: 'Primary', description: 'Primary button background', default: '#171717' },
        { key: 'primaryForeground', cssVar: '--shadcn-primary-foreground', label: 'Primary Foreground', description: 'Primary button text', default: '#fafafa' },
        { key: 'secondary', cssVar: '--shadcn-secondary', label: 'Secondary', description: 'Secondary button background', default: '#f5f5f5' },
        { key: 'secondaryForeground', cssVar: '--shadcn-secondary-foreground', label: 'Secondary Foreground', description: 'Secondary button text', default: '#171717' },
        { key: 'accent', cssVar: '--shadcn-accent', label: 'Accent', description: 'Accent/hover background', default: '#f5f5f5' },
        { key: 'accentForeground', cssVar: '--shadcn-accent-foreground', label: 'Accent Foreground', description: 'Accent text', default: '#171717' },
      ]
    },
    {
      id: 'surfaces',
      label: 'Surfaces',
      description: 'Borders, inputs, and surfaces',
      colors: [
        { key: 'muted', cssVar: '--shadcn-muted', label: 'Muted', description: 'Muted background', default: '#f5f5f5' },
        { key: 'mutedForeground', cssVar: '--shadcn-muted-foreground', label: 'Muted Foreground', description: 'Muted text', default: '#737373' },
        { key: 'border', cssVar: '--shadcn-border', label: 'Border', description: 'Default borders', default: '#e5e5e5' },
        { key: 'input', cssVar: '--shadcn-input', label: 'Input', description: 'Input borders', default: '#e5e5e5' },
        { key: 'ring', cssVar: '--shadcn-ring', label: 'Ring', description: 'Focus ring', default: '#0a0a0a' },
      ]
    },
    {
      id: 'status',
      label: 'Status',
      description: 'Destructive and status colors',
      colors: [
        { key: 'destructive', cssVar: '--shadcn-destructive', label: 'Destructive', description: 'Error/destructive', default: '#ef4444' },
        { key: 'destructiveForeground', cssVar: '--shadcn-destructive-foreground', label: 'Destructive Foreground', description: 'Text on destructive', default: '#fafafa' },
      ]
    },
  ],
};
