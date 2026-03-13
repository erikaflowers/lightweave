// Berners-Lee / Web 0.1 Theme
// "This is a document, not an application"
// Inspired by info.cern.ch - the first website ever (1991)
// Pure HTML, no CSS, just linked documents

export default {
  id: 'berners-lee',
  name: 'Berners-Lee (1991)',
  description: 'The original World Wide Web. Documents linked to documents.',
  colors: {
    // That specific gray, or pure white - the browser default
    backgroundPrimary: '#C0C0C0',
    backgroundSecondary: '#C0C0C0',
    backgroundTertiary: '#C0C0C0',
    backgroundCard: '#FFFFFF',      // White "paper" for content areas

    // Pure black text - the only text color
    textPrimary: '#000000',
    textSecondary: '#000000',
    textMuted: '#666666',           // Slightly lighter for less emphasis

    // Borders: simple, functional
    borderDefault: '#808080',       // Gray border
    borderLight: '#A0A0A0',

    // Links are the only "accent" - pure blue
    accentPrimary: '#0000FF',       // THE blue link color
    accentPrimaryHover: '#0000CC',  // Slightly darker on hover
    accentSecondary: '#800080',     // Visited link purple
    accentBackground: '#E0E0E0',
    accentBorder: '#808080',

    // Buttons: browser default gray
    buttonText: '#000000',

    // Sidebar matches the gray
    sidebarBackground: '#C0C0C0',
    sidebarText: '#000000',
    sidebarTextMuted: '#666666',
    sidebarAccent: '#0000FF',       // Blue links for selected
    sidebarAccentText: '#FFFFFF',
    sidebarBorder: '#808080',

    // Status - still functional but muted
    success: '#008000',             // Dark green
    successBackground: '#E0E0E0',
    error: '#CC0000',               // Dark red
    errorBackground: '#E0E0E0',
    warning: '#CC6600',             // Dark orange
    warningBackground: '#E0E0E0',

    // Overlay - simple darkening
    overlayBackdrop: 'rgba(0, 0, 0, 0.5)'
  },
  typography: {
    // Times New Roman - the browser default, non-negotiable
    fontFamilyHeading: "'Times New Roman', Times, serif",
    fontFamilyBody: "'Times New Roman', Times, serif",
    fontFamilyMono: "'Courier New', Courier, monospace",
    // No bold emphasis in the original web
    fontWeightNormal: '400',
    fontWeightMedium: '400',
    fontWeightSemibold: '400',
    fontWeightBold: '700'           // Only for actual headings
  }
};
