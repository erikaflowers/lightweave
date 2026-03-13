# Lightweave

AI-powered theme creator, visual editor, and switcher. Generate beautiful color themes from keywords, tweak them in a live editor, and export or integrate them into any project.

**[Live Demo](https://lightweave.netlify.app)** — try it now, no setup required.

## What It Does

**Generate** — Type keywords like "ocean sunset" or "cyberpunk neon" and Lightweave uses Claude to generate a complete, accessible color theme with 28 coordinated color tokens.

**Edit** — Open any theme in the visual editor. Every color has a picker, hex input, and live preview. Changes apply instantly — what you see is what you get.

**Browse** — 31 built-in themes across four collections: Originals, Modern, Retro (Win95, DOS, Game Boy, etc.), and Vibes (Synthwave, Matrix, Tron, etc.).

**Export** — Copy theme JSON to clipboard or download as a `.json` file. Import themes from JSON or file upload.

**Integrate** — Schema-driven architecture means Lightweave adapts to your project's color system, not the other way around.

## Quick Start

```bash
git clone https://github.com/erikaflowers/lightweave.git
cd lightweave
npm install
npm run dev
```

For AI theme generation, add your Anthropic API key:

```bash
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env
```

Then run with Netlify Dev to enable the serverless function:

```bash
npx netlify dev
```

## Schema-Driven Architecture

Lightweave doesn't hardcode its color system. Everything — the editor UI, AI prompt, CSS variables, localStorage keys — derives from a single schema config.

### Use a Preset

```js
// lightweave.config.js
import { minimal } from './src/presets/index.js';
export default minimal;  // 8 colors instead of 28
```

Four presets included:

| Preset | Colors | For |
|--------|--------|-----|
| `full` | 28 | Full app with sidebar, status colors, overlays |
| `minimal` | 8 | Simple sites — bg, text, accent, border |
| `tailwind` | ~20 | Maps to Tailwind's color categories |
| `shadcn` | ~15 | Maps to shadcn/ui CSS variables |

### Define Your Own

```js
// lightweave.config.js
export default {
  name: 'My App',
  prefix: '--my',
  storageKey: 'my_app',
  defaultTheme: 'default',
  groups: [
    {
      id: 'backgrounds',
      label: 'Backgrounds',
      description: 'Page backgrounds',
      colors: [
        { key: 'bgPrimary', cssVar: '--my-bg', label: 'Primary', description: 'Main background', default: '#ffffff' },
        { key: 'bgCard', cssVar: '--my-bg-card', label: 'Card', description: 'Card surfaces', default: '#f5f5f5' },
      ]
    },
    // ... add as many groups and colors as you need
  ]
};
```

The editor, AI generator, and store all adapt automatically.

### Crawl an Existing Project

```bash
npx lightweave init --dir ./src --prefix "--app" --name "My App"
```

Scans your CSS files for custom property declarations, auto-groups them by naming convention (bg, text, accent, border, status, etc.), and generates a `lightweave.config.js` starter file.

## Embed in Your App

Import individual components into any React app:

```jsx
import { ThemeEditor, ThemeBrowser, useTheme } from 'lightweave';

function SettingsPage() {
  const { themeId, setTheme, customThemes, saveCustomTheme } = useTheme();

  return (
    <>
      <ThemeBrowser themeId={themeId} setTheme={setTheme} customThemes={customThemes} />
      <ThemeEditor theme={currentTheme} onSave={saveCustomTheme} />
    </>
  );
}
```

For isolated instances (multiple theme systems on one page):

```js
import { createStore } from 'lightweave/store';
import mySchema from './lightweave.config.js';

const store = createStore(mySchema);
store.apply(myTheme);
```

## How It Works

- **No React context** — Theme state lives in a module-level store. CSS variables are applied directly to `:root` before React renders, so there's no flash of unstyled content.
- **localStorage persistence** — Active theme ID and custom themes are saved per-schema namespace.
- **AI generation** — A Netlify serverless function sends your keywords + the schema's color definitions to Claude, which returns a complete theme. The prompt adapts dynamically to whatever schema you're using.
- **`react-colorful`** — Lightweight color pickers for hex and rgba values in the editor.

## Project Structure

```
lightweave/
├── bin/lightweave.js              # CLI: npx lightweave init
├── lightweave.config.js           # Schema config (edit this)
├── netlify/functions/
│   └── generate-theme.mjs         # AI theme generation endpoint
├── src/
│   ├── index.js                   # Package entry (embedded imports)
│   ├── lib/
│   │   ├── schema.js              # Schema loader, validator, utilities
│   │   ├── store.js               # Theme engine (apply, persist, CRUD)
│   │   ├── api.js                 # Fetch wrapper
│   │   └── chatFont.js            # Font preference persistence
│   ├── presets/                    # Schema presets (full, minimal, tailwind, shadcn)
│   ├── themes/                    # 31 built-in theme files
│   ├── components/
│   │   ├── ThemeBrowser.jsx       # Theme grid with groups
│   │   ├── ThemeCard.jsx          # Theme preview card
│   │   ├── ThemeGenerator.jsx     # AI generation + import UI
│   │   ├── ThemeEditor/           # Visual color editor
│   │   ├── LivePreview.jsx        # Sample UI panel
│   │   └── FontPicker.jsx         # Chat font toggle
│   └── hooks/useTheme.js          # React hook wrapping the store
└── src/lightweave.css             # Full stylesheet with CSS variable defaults
```

## Built-In Themes

**Originals** — Warm Earth, Kestris Dark, Kestris Light, Kestris Midnight

**Modern** — Fictioneer, Fictioneer Dark, Dark, Google, Spotify, Airbnb, Enterprise, macOS Sequoia

**Retro** — Windows 95, Windows XP, Windows 3.1, Mac Classic, DOS, WordPerfect, GeoCities, Berners-Lee, Game Boy, Mushroom Kingdom

**Vibes** — Synthwave, Synthwave Light, Matrix, Tron, Falcon, Winter Hearth, Democratic Steel, Vintage Cola, Cyber Noir

## License

MIT
