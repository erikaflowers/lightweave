// Game Boy DMG Theme
// Original 1989 Game Boy - 4 shades of pea green

export default {
  id: 'gameboy',
  name: 'Game Boy',
  description: 'Original 1989 DMG Game Boy - 4 colors only',
  colors: {
    // The classic 4-color palette
    backgroundPrimary: '#9BBC0F',      // Lightest - main background
    backgroundSecondary: '#8BAC0F',    // Light - secondary surfaces
    backgroundTertiary: '#8BAC0F',     // Light
    backgroundCard: '#9BBC0F',         // Lightest
    textPrimary: '#0F380F',            // Darkest - main text
    textSecondary: '#306230',          // Dark - secondary text
    textMuted: '#306230',              // Dark
    borderDefault: '#306230',          // Dark
    borderLight: '#8BAC0F',            // Light
    accentPrimary: '#0F380F',          // Darkest
    accentPrimaryHover: '#306230',     // Dark
    accentSecondary: '#306230',        // Dark
    accentBackground: '#8BAC0F',       // Light
    accentBorder: '#306230',           // Dark
    buttonText: '#9BBC0F',             // Lightest (inverted for dark buttons)
    sidebarBackground: '#8BAC0F',      // Light
    sidebarText: '#0F380F',            // Darkest
    sidebarTextMuted: '#306230',       // Dark
    sidebarAccent: '#0F380F',          // Darkest
    sidebarAccentText: '#9BBC0F',      // Lightest
    sidebarBorder: '#306230',          // Dark
    success: '#0F380F',                // Darkest (no color variety allowed!)
    successBackground: '#8BAC0F',      // Light
    error: '#0F380F',                  // Darkest
    errorBackground: '#8BAC0F',        // Light
    warning: '#306230',                // Dark
    warningBackground: '#8BAC0F',      // Light
    overlayBackdrop: 'rgba(15, 56, 15, 0.7)'  // Darkest with transparency
  },
  typography: {
    // Press Start 2P is a pixel font from Google Fonts
    fontFamilyHeading: "'Press Start 2P', 'Courier New', monospace",
    fontFamilyBody: "'Press Start 2P', 'Courier New', monospace",
    fontFamilyMono: "'Press Start 2P', 'Courier New', monospace",
    fontWeightNormal: '400',
    fontWeightMedium: '400',
    fontWeightSemibold: '400',
    fontWeightBold: '400'
  },
  effects: {
    borderRadius: '0px',
    borderRadiusSmall: '0px',
    // Hard pixel shadow - 2px offset, no blur
    boxShadow: '2px 2px 0 #306230',
    boxShadowLarge: '4px 4px 0 #306230',
    backdropBlur: 'none'
  }
};
