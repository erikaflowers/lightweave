// Fictioneer Dark Theme - Official Brand Theme (Dark Mode)
// Matches the landing page's dark mode purple/pink gradient aesthetic

export default {
  id: 'fictioneer-dark',
  name: 'Fictioneer Dark',
  description: 'Official dark purple brand theme',
  colors: {
    // Main backgrounds - deep purple/navy
    backgroundPrimary: '#0a0a0f',
    backgroundSecondary: '#12121a',
    backgroundTertiary: '#1a1a24',
    backgroundCard: '#1e1e2a',

    // Text - light with purple undertones
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    textMuted: 'rgba(255, 255, 255, 0.4)',

    // Borders - subtle light
    borderDefault: 'rgba(255, 255, 255, 0.08)',
    borderLight: 'rgba(255, 255, 255, 0.12)',

    // Primary accent - purple (main brand color)
    accentPrimary: '#a855f7',
    accentPrimaryHover: '#9333ea',
    accentSecondary: '#8b5cf6',
    accentBackground: 'rgba(168, 85, 247, 0.15)',
    accentBorder: 'rgba(168, 85, 247, 0.3)',
    buttonText: '#ffffff',

    // Sidebar - slightly lighter dark
    sidebarBackground: '#12121a',
    sidebarText: '#ffffff',
    sidebarTextMuted: 'rgba(255, 255, 255, 0.5)',
    sidebarAccent: '#a855f7',
    sidebarAccentText: '#ffffff',
    sidebarBorder: 'rgba(255, 255, 255, 0.08)',

    // Status colors - vibrant for dark mode
    success: '#22c55e',
    successBackground: 'rgba(34, 197, 94, 0.15)',
    error: '#ef4444',
    errorBackground: 'rgba(239, 68, 68, 0.15)',
    warning: '#f59e0b',
    warningBackground: 'rgba(245, 158, 11, 0.15)',

    // Overlay
    overlayBackdrop: 'rgba(0, 0, 0, 0.7)'
  },
  typography: {
    fontFamilyHeading: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyBody: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyMono: "'JetBrains Mono', 'SF Mono', Monaco, monospace",
    fontWeightNormal: '400',
    fontWeightMedium: '500',
    fontWeightSemibold: '600',
    fontWeightBold: '700'
  }
};
