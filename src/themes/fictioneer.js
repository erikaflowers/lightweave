// Fictioneer Theme - Official Brand Theme
// Matches the landing page's purple/pink gradient aesthetic

export default {
  id: 'fictioneer',
  name: 'Fictioneer',
  description: 'Official purple and pink brand theme',
  colors: {
    // Main backgrounds - light purple tints
    backgroundPrimary: '#faf8fc',
    backgroundSecondary: '#f3f0f7',
    backgroundTertiary: '#ebe5f2',
    backgroundCard: '#ffffff',

    // Text - navy/purple tones
    textPrimary: '#1a1a2e',
    textSecondary: '#4a4a68',
    textMuted: '#8888a4',

    // Borders - subtle purple
    borderDefault: '#e5ddf0',
    borderLight: '#ede6f5',

    // Primary accent - purple (main brand color)
    accentPrimary: '#8b5cf6',
    accentPrimaryHover: '#7c3aed',
    accentSecondary: '#a855f7',
    accentBackground: '#f5f0ff',
    accentBorder: '#ddd6fe',
    buttonText: '#ffffff',

    // Sidebar - dark purple/navy
    sidebarBackground: '#1a1a2e',
    sidebarText: '#f3f0f7',
    sidebarTextMuted: '#8888a4',
    sidebarAccent: '#a855f7',
    sidebarAccentText: '#ffffff',
    sidebarBorder: '#2d2d48',

    // Status colors - tinted to match theme
    success: '#10b981',
    successBackground: '#ecfdf5',
    error: '#ef4444',
    errorBackground: '#fef2f2',
    warning: '#f59e0b',
    warningBackground: '#fffbeb',

    // Overlay
    overlayBackdrop: 'rgba(26, 26, 46, 0.6)'
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
