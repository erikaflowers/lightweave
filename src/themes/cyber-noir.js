// Cyber Noir Theme
// Dark cyberpunk detective aesthetic — neon accents against deep noir blacks
// Rain-soaked streets, holographic signage, trenchcoats and terminal screens

export default {
  id: 'cyber-noir',
  name: 'Cyber Noir',
  description: 'Neon-lit darkness — cyberpunk detective meets film noir',
  colors: {
    backgroundPrimary: '#0a0a0f',        // Near-black with blue tint
    backgroundSecondary: '#0f1018',      // Slightly lighter noir
    backgroundTertiary: '#151621',       // Panel depth
    backgroundCard: '#12131e',           // Elevated surface
    textPrimary: '#c8cad0',             // Cool grey — not pure white, like fog
    textSecondary: '#7f8694',           // Muted steel
    textMuted: '#4a4f5e',              // Deep shadow text
    borderDefault: '#1e2030',           // Barely visible border
    borderLight: '#282a3a',             // Subtle divider
    accentPrimary: '#00e5ff',           // Cyan neon — the signature color
    accentPrimaryHover: '#33ecff',      // Brighter cyan on hover
    accentSecondary: '#ff2e63',         // Hot pink neon — secondary pop
    accentBackground: 'rgba(0, 229, 255, 0.08)',  // Cyan glow, barely there
    accentBorder: 'rgba(0, 229, 255, 0.25)',      // Cyan border glow
    buttonText: '#0a0a0f',             // Dark text on neon buttons
    sidebarBackground: '#080810',       // Deepest black for sidebar
    sidebarText: '#8b8fa0',            // Muted sidebar text
    sidebarTextMuted: '#3d4055',       // Very muted
    sidebarAccent: '#00e5ff',          // Cyan active
    sidebarAccentText: '#0a0a0f',      // Dark on cyan
    sidebarBorder: '#1a1b2a',          // Dark border
    success: '#00ff9f',                // Green neon
    successBackground: 'rgba(0, 255, 159, 0.08)',
    error: '#ff2e63',                  // Hot pink
    errorBackground: 'rgba(255, 46, 99, 0.08)',
    warning: '#ffb800',                // Amber warning
    warningBackground: 'rgba(255, 184, 0, 0.08)',
    overlayBackdrop: 'rgba(5, 5, 10, 0.85)'
  },
  typography: {
    fontFamilyHeading: "'Share Tech Mono', 'JetBrains Mono', monospace",
    fontFamilyBody: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyMono: "'Share Tech Mono', 'JetBrains Mono', monospace",
    fontWeightNormal: '400',
    fontWeightMedium: '500',
    fontWeightSemibold: '600',
    fontWeightBold: '700'
  }
};
