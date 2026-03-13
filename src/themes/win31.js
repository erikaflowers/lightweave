// Windows 3.1 Theme
// Classic 1992 Windows aesthetic - teal, gray, and beveled buttons

export default {
  id: 'win31',
  name: 'Windows 3.1',
  description: 'Classic 1992 Program Manager aesthetic',
  colors: {
    backgroundPrimary: '#008080',
    backgroundSecondary: '#C0C0C0',
    backgroundTertiary: '#C0C0C0',
    backgroundCard: '#C0C0C0',
    textPrimary: '#000000',
    textSecondary: '#000000',
    textMuted: '#404040',
    borderDefault: '#808080',
    borderLight: '#FFFFFF',
    accentPrimary: '#000080',
    accentPrimaryHover: '#000060',
    accentSecondary: '#000080',
    accentBackground: '#C0C0C0',
    accentBorder: '#000080',
    buttonText: '#FFFFFF',
    sidebarBackground: '#C0C0C0',
    sidebarText: '#000000',
    sidebarTextMuted: '#404040',
    sidebarAccent: '#000080',
    sidebarAccentText: '#FFFFFF',
    sidebarBorder: '#808080',
    success: '#008000',
    successBackground: '#C0C0C0',
    error: '#FF0000',
    errorBackground: '#C0C0C0',
    warning: '#808000',
    warningBackground: '#C0C0C0',
    overlayBackdrop: 'rgba(0, 0, 0, 0.5)',
    // Windows 3.1 specific - for 3D beveled effects
    bevelLight: '#FFFFFF',
    bevelDark: '#808080',
    bevelDarker: '#404040',
    titleBar: '#000080',
    titleBarText: '#FFFFFF',
    titleBarInactive: '#808080'
  },
  typography: {
    fontFamilyHeading: "'MS Sans Serif', Tahoma, Geneva, sans-serif",
    fontFamilyBody: "'MS Sans Serif', Tahoma, Geneva, sans-serif",
    fontFamilyMono: "'Fixedsys', 'Courier New', monospace",
    fontWeightNormal: '400',
    fontWeightMedium: '400',
    fontWeightSemibold: '700',
    fontWeightBold: '700'
  },
  effects: {
    borderRadius: '0px',
    borderRadiusSmall: '0px',
    boxShadow: 'inset -1px -1px 0 #808080, inset 1px 1px 0 #FFFFFF, inset -2px -2px 0 #404040, inset 2px 2px 0 #DFDFDF',
    boxShadowLarge: 'inset -1px -1px 0 #808080, inset 1px 1px 0 #FFFFFF',
    backdropBlur: 'none'
  }
};
