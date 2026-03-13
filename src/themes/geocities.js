// GeoCities 1999 Theme
// "Best viewed in Netscape Navigator 4.0 at 800x600"
// This theme is intentionally chaotic - a love letter to the wild west of web design

export default {
  id: 'geocities',
  name: 'GeoCities 1999',
  description: 'Under construction! Please sign my guestbook! 🚧',
  colors: {
    // That specific navy blue from every late 90s site
    backgroundPrimary: '#000080',
    backgroundSecondary: '#000066',
    backgroundTertiary: '#00004d',
    // Cards get the teal treatment
    backgroundCard: '#008080',

    // LOUD text colors
    textPrimary: '#FFFF00',        // Yellow on navy - maximum readability* (*not really)
    textSecondary: '#00FF00',      // Lime green for secondary text
    textMuted: '#00FFFF',          // Cyan for muted text (still loud)

    // Chunky neon borders
    borderDefault: '#FF00FF',      // Magenta borders
    borderLight: '#FF6600',        // Construction orange

    // Accent colors - ALL THE NEONS
    accentPrimary: '#FF00FF',      // Magenta
    accentPrimaryHover: '#FF66FF', // Lighter magenta on hover
    accentSecondary: '#00FFFF',    // Cyan
    accentBackground: '#000066',
    accentBorder: '#FF00FF',

    // Buttons get the 3D beveled look via the button text being visible
    buttonText: '#000000',         // Black text on neon buttons

    // Sidebar gets the teal vibe
    sidebarBackground: '#008080',
    sidebarText: '#FFFF00',
    sidebarTextMuted: '#00FFFF',
    sidebarAccent: '#FF0000',      // Pure red for selected
    sidebarAccentText: '#FFFFFF',
    sidebarBorder: '#FF00FF',

    // Status colors (still neon, still loud)
    success: '#00FF00',            // LIME GREEN SUCCESS
    successBackground: '#004400',
    error: '#FF0000',              // PURE RED ERROR
    errorBackground: '#440000',
    warning: '#FF6600',            // Construction orange warning
    warningBackground: '#442200',

    // Overlay keeps some darkness so modals are visible
    overlayBackdrop: 'rgba(0, 0, 128, 0.85)'
  },
  typography: {
    // THE FONTS OF THE ERA
    fontFamilyHeading: "'Comic Sans MS', 'Comic Sans', cursive, sans-serif",
    fontFamilyBody: "'Comic Sans MS', 'Comic Sans', 'Times New Roman', serif",
    fontFamilyMono: "'Courier New', Courier, monospace",
    fontWeightNormal: '400',
    fontWeightMedium: '400',       // Comic Sans doesn't need weight
    fontWeightSemibold: '700',
    fontWeightBold: '700'
  }
};
