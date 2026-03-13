#!/usr/bin/env node

// Lightweave CLI — Project Crawler & Config Generator
// Usage: npx lightweave init [--dir <path>] [--prefix <prefix>] [--name <name>]
//
// Scans CSS/SCSS files for custom property declarations and generates
// a lightweave.config.js file with auto-grouped color variables.

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, relative, extname } from 'path';

// ── CLI Argument Parsing ─────────────────────────────────────────────────

const args = process.argv.slice(2);
const command = args[0];

if (!command || command === '--help' || command === '-h') {
  console.log(`
  lightweave — Theme system configuration generator

  Usage:
    lightweave init [options]    Scan project and generate lightweave.config.js

  Options:
    --dir <path>       Directory to scan (default: current directory)
    --prefix <prefix>  CSS variable prefix for generated config (default: --app)
    --name <name>      Project name (default: directory name)
    --out <path>       Output file path (default: ./lightweave.config.js)
    -h, --help         Show this help message

  Examples:
    lightweave init
    lightweave init --dir ./src --prefix --my --name "My App"
`);
  process.exit(0);
}

if (command !== 'init') {
  console.error(`Unknown command: ${command}\nRun "lightweave --help" for usage.`);
  process.exit(1);
}

// Parse flags
function getFlag(name, defaultValue) {
  const idx = args.indexOf(name);
  if (idx === -1 || idx + 1 >= args.length) return defaultValue;
  return args[idx + 1];
}

const scanDir = getFlag('--dir', '.');
const prefix = getFlag('--prefix', '--app');
const projectName = getFlag('--name', scanDir === '.' ? 'My Project' : scanDir.split('/').pop());
const outPath = getFlag('--out', './lightweave.config.js');

// ── File Scanner ─────────────────────────────────────────────────────────

const CSS_EXTENSIONS = new Set(['.css', '.scss', '.sass', '.less', '.pcss']);

function findCssFiles(dir, results = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return results;
  }

  for (const entry of entries) {
    // Skip common non-source directories
    if (['node_modules', '.git', 'dist', 'build', '.next', '.nuxt', '.svelte-kit'].includes(entry)) continue;

    const fullPath = join(dir, entry);
    let stat;
    try {
      stat = statSync(fullPath);
    } catch {
      continue;
    }

    if (stat.isDirectory()) {
      findCssFiles(fullPath, results);
    } else if (CSS_EXTENSIONS.has(extname(entry))) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Extract CSS custom property declarations from a file.
 * Matches patterns like: --variable-name: #hex | rgb(...) | hsl(...) | value;
 */
function extractCssVars(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const vars = [];

  // Match custom property declarations
  const regex = /(--([\w-]+))\s*:\s*([^;]+);/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const cssVar = match[1];
    const name = match[2];
    const value = match[3].trim();

    // Only include color-like values
    if (isColorValue(value)) {
      vars.push({
        cssVar,
        name,
        value,
        file: relative(scanDir, filePath),
      });
    }
  }

  return vars;
}

function isColorValue(value) {
  // Hex colors
  if (/^#[0-9a-fA-F]{3,8}$/.test(value)) return true;
  // RGB/RGBA/HSL/HSLA functions
  if (/^(rgb|rgba|hsl|hsla)\s*\(/.test(value)) return true;
  // Named colors (common ones)
  if (/^(transparent|currentColor|inherit|black|white)$/i.test(value)) return false;
  // oklch, lab, etc.
  if (/^(oklch|oklab|lab|lch)\s*\(/.test(value)) return true;
  return false;
}

// ── Tailwind Config Scanner ──────────────────────────────────────────────

function scanTailwindConfig() {
  const paths = [
    join(scanDir, 'tailwind.config.js'),
    join(scanDir, 'tailwind.config.ts'),
    join(scanDir, 'tailwind.config.mjs'),
  ];

  for (const p of paths) {
    if (existsSync(p)) {
      console.log(`  Found Tailwind config: ${relative(scanDir, p)}`);
      console.log(`  (Tailwind theme.colors extraction is best done manually — use the generated config as a starting point)`);
      return true;
    }
  }
  return false;
}

// ── Auto-Grouping Heuristics ─────────────────────────────────────────────

const GROUP_PATTERNS = [
  { id: 'backgrounds', label: 'Backgrounds', description: 'Page and panel backgrounds', patterns: ['bg', 'background', 'surface'] },
  { id: 'text', label: 'Text', description: 'Typography colors', patterns: ['text', 'font', 'fg', 'foreground', 'heading', 'body', 'label'] },
  { id: 'accents', label: 'Accents', description: 'Interactive elements', patterns: ['accent', 'primary', 'brand', 'link', 'action', 'focus', 'ring'] },
  { id: 'borders', label: 'Borders', description: 'Lines and dividers', patterns: ['border', 'divider', 'separator', 'outline', 'input'] },
  { id: 'status', label: 'Status', description: 'Feedback colors', patterns: ['success', 'error', 'warning', 'danger', 'info', 'destructive'] },
  { id: 'sidebar', label: 'Sidebar', description: 'Navigation sidebar', patterns: ['sidebar', 'nav', 'menu'] },
  { id: 'overlay', label: 'Overlay', description: 'Modals and overlays', patterns: ['overlay', 'modal', 'backdrop', 'popover', 'dialog'] },
];

function classifyVar(varName) {
  const lower = varName.toLowerCase();
  for (const group of GROUP_PATTERNS) {
    if (group.patterns.some(p => lower.includes(p))) {
      return group.id;
    }
  }
  return 'other';
}

function kebabToCamel(str) {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function kebabToLabel(str) {
  return str
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// ── Config Generator ─────────────────────────────────────────────────────

function generateConfig(vars) {
  // Group variables
  const grouped = {};
  for (const v of vars) {
    const groupId = classifyVar(v.name);
    if (!grouped[groupId]) grouped[groupId] = [];
    grouped[groupId].push(v);
  }

  // Build groups array
  const groups = [];
  for (const gp of GROUP_PATTERNS) {
    if (grouped[gp.id]?.length > 0) {
      groups.push({
        id: gp.id,
        label: gp.label,
        description: gp.description,
        colors: grouped[gp.id].map(v => ({
          key: kebabToCamel(v.name),
          cssVar: v.cssVar,
          label: kebabToLabel(v.name),
          description: `From ${v.file}`,
          default: v.value,
        })),
      });
    }
  }

  // Add "Other" group for unclassified
  if (grouped.other?.length > 0) {
    groups.push({
      id: 'other',
      label: 'Other',
      description: 'Additional colors',
      colors: grouped.other.map(v => ({
        key: kebabToCamel(v.name),
        cssVar: v.cssVar,
        label: kebabToLabel(v.name),
        description: `From ${v.file}`,
        default: v.value,
      })),
    });
  }

  return { groups };
}

function renderConfig(config) {
  const groupsStr = config.groups.map(g => {
    const colorsStr = g.colors.map(c =>
      `        { key: '${c.key}', cssVar: '${c.cssVar}', label: '${c.label}', description: '${c.description}', default: '${c.default}' }`
    ).join(',\n');

    return `    {
      id: '${g.id}',
      label: '${g.label}',
      description: '${g.description}',
      colors: [
${colorsStr}
      ]
    }`;
  }).join(',\n');

  return `// Generated by: lightweave init
// Edit this file to customize your theme schema.
// Docs: https://github.com/erikaflowers/lightweave

export default {
  name: '${projectName}',
  version: '${projectName.toLowerCase().replace(/\s+/g, '-')}-v1',
  prefix: '${prefix}',
  storageKey: '${prefix.replace(/^--/, '').replace(/-/g, '_')}',
  defaultTheme: 'default',

  groups: [
${groupsStr}
  ],
};
`;
}

// ── Main ─────────────────────────────────────────────────────────────────

console.log(`\n  Lightweave — Scanning project for CSS variables...\n`);

const cssFiles = findCssFiles(scanDir);
if (cssFiles.length === 0) {
  console.log(`  No CSS files found in ${scanDir}`);
  console.log(`  Try specifying a directory: lightweave init --dir ./src\n`);
  process.exit(1);
}

console.log(`  Found ${cssFiles.length} CSS file${cssFiles.length === 1 ? '' : 's'}:`);
for (const f of cssFiles) {
  console.log(`    ${relative(scanDir, f)}`);
}

// Scan for variables
const allVars = [];
const seenVars = new Set();

for (const f of cssFiles) {
  const vars = extractCssVars(f);
  for (const v of vars) {
    // Deduplicate by variable name (keep first occurrence)
    if (!seenVars.has(v.cssVar)) {
      seenVars.add(v.cssVar);
      allVars.push(v);
    }
  }
}

if (allVars.length === 0) {
  console.log(`\n  No CSS custom properties with color values found.`);
  scanTailwindConfig();
  console.log(`  You can create a config manually or start from a preset:\n`);
  console.log(`    import { minimal } from 'lightweave/presets';`);
  console.log(`    export default minimal;\n`);
  process.exit(0);
}

console.log(`\n  Found ${allVars.length} CSS color variable${allVars.length === 1 ? '' : 's'}:\n`);
for (const v of allVars) {
  console.log(`    ${v.cssVar}: ${v.value}`);
}

// Check for Tailwind
scanTailwindConfig();

// Generate config
const config = generateConfig(allVars);

console.log(`\n  Auto-grouped into ${config.groups.length} categor${config.groups.length === 1 ? 'y' : 'ies'}:`);
for (const g of config.groups) {
  console.log(`    ${g.label} (${g.colors.length} var${g.colors.length === 1 ? '' : 's'})`);
}

// Write config
const output = renderConfig(config);

if (existsSync(outPath)) {
  console.log(`\n  Warning: ${outPath} already exists. Overwriting...`);
}

writeFileSync(outPath, output, 'utf-8');
console.log(`\n  Generated ${outPath}`);
console.log(`  Edit the file to refine groups, labels, and descriptions.\n`);
