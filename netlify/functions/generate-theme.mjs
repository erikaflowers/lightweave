// Lightweave AI Theme Generator — Netlify Function
// POST /api/generate-theme { keywords: "ocean sunset", schema?: { groups: [...] } }
// Returns { theme: { id, name, description, colors, typography, isCustom, keywords } }
//
// If a schema is provided in the request body, the prompt is built dynamically
// from its color definitions. Otherwise uses the default 28-key Lightweave schema.

// ── Default schema (inlined to avoid import issues in Netlify Functions) ──

const DEFAULT_COLORS = [
  { key: 'backgroundPrimary', description: 'main app background' },
  { key: 'backgroundSecondary', description: 'secondary/sidebar backgrounds' },
  { key: 'backgroundTertiary', description: 'tertiary/deeper backgrounds' },
  { key: 'backgroundCard', description: 'card/elevated surfaces' },
  { key: 'textPrimary', description: 'main text color' },
  { key: 'textSecondary', description: 'secondary text' },
  { key: 'textMuted', description: 'muted/placeholder text' },
  { key: 'borderDefault', description: 'default borders' },
  { key: 'borderLight', description: 'subtle borders' },
  { key: 'accentPrimary', description: 'primary accent/buttons' },
  { key: 'accentPrimaryHover', description: 'accent hover state' },
  { key: 'accentSecondary', description: 'secondary accent' },
  { key: 'accentBackground', description: 'accent tinted background' },
  { key: 'accentBorder', description: 'accent colored border' },
  { key: 'buttonText', description: 'text on accent buttons' },
  { key: 'sidebarBackground', description: 'sidebar background' },
  { key: 'sidebarText', description: 'sidebar text' },
  { key: 'sidebarTextMuted', description: 'sidebar muted text' },
  { key: 'sidebarAccent', description: 'sidebar accent color' },
  { key: 'sidebarAccentText', description: 'text on sidebar accent' },
  { key: 'sidebarBorder', description: 'sidebar borders' },
  { key: 'success', description: 'success state' },
  { key: 'successBackground', description: 'success background tint' },
  { key: 'error', description: 'error state' },
  { key: 'errorBackground', description: 'error background tint' },
  { key: 'warning', description: 'warning state' },
  { key: 'warningBackground', description: 'warning background tint' },
  { key: 'overlayBackdrop', description: 'modal backdrop (use rgba)' },
];

// ── Dynamic Prompt Builder ───────────────────────────────────────────────

const SYSTEM_PROMPT = `You are an expert UI/UX designer specializing in color theory and accessibility. You create beautiful, cohesive color palettes for software applications. You understand contrast ratios, color harmony, and how to evoke specific moods through color.

IMPORTANT: You MUST respond with valid JSON only. No markdown code fences, no explanation, just the raw JSON object.`;

function buildThemePrompt(keywords, colorDefs) {
  const colorList = colorDefs
    .map(c => `    "${c.key}": "#hex - ${c.description}"`)
    .join(',\n');

  return `Generate a complete color theme for an application based on these keywords: "${keywords}"

The theme should evoke the mood, feeling, or aesthetic suggested by those keywords while remaining functional and readable for a productivity app.

Return a JSON object with this exact structure:

{
  "name": "Theme Name (2-4 words, creative and evocative)",
  "description": "Brief description (under 60 chars)",
  "colors": {
${colorList}
  },
  "typography": {
    "fontFamilyHeading": "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    "fontFamilyBody": "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    "fontFamilyMono": "'JetBrains Mono', 'Fira Code', monospace",
    "fontWeightNormal": "400",
    "fontWeightMedium": "500",
    "fontWeightSemibold": "600",
    "fontWeightBold": "700"
  }
}

CRITICAL REQUIREMENTS:
1. Ensure sufficient contrast between text and backgrounds (WCAG AA minimum)
2. Accent colors should pop but not overwhelm
3. Success/error/warning colors should be recognizable but fit the theme
4. All hex values must be valid 6-character hex codes (e.g., #FF5500)
5. The theme should be FUNCTIONAL - users need to read and write in this app for hours

Respond with ONLY the JSON object, no other text.`;
}

/**
 * Extract flat color definitions from a schema object.
 * Schema shape: { groups: [{ colors: [{ key, description }] }] }
 */
function extractColorDefs(schema) {
  if (!schema?.groups) return DEFAULT_COLORS;
  const defs = [];
  for (const group of schema.groups) {
    if (!Array.isArray(group.colors)) continue;
    for (const color of group.colors) {
      if (color.key) {
        defs.push({ key: color.key, description: color.description || color.label || color.key });
      }
    }
  }
  return defs.length > 0 ? defs : DEFAULT_COLORS;
}

// ── Handler ──────────────────────────────────────────────────────────────

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export default async (req) => {
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const body = await req.json();
  const keywords = (body.keywords || '').trim();

  if (!keywords) {
    return jsonResponse({ error: 'Keywords are required' }, 400);
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return jsonResponse({ error: 'ANTHROPIC_API_KEY not configured' }, 500);
  }

  // Use schema from request body if provided, otherwise default
  const colorDefs = body.schema ? extractColorDefs(body.schema) : DEFAULT_COLORS;
  const themePrompt = buildThemePrompt(keywords, colorDefs);

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages: [
          { role: 'user', content: themePrompt }
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[generate-theme] Anthropic API error:', res.status, errText);
      return jsonResponse({ error: `AI service error: ${res.status}` }, 500);
    }

    const data = await res.json();
    let responseText = '';
    for (const block of data.content) {
      if (block.type === 'text') responseText += block.text;
    }
    responseText = responseText.trim();

    // Strip markdown fences if present
    let jsonStr = responseText;
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?/g, '').replace(/\n?```$/g, '');
    }

    let themeData;
    try {
      themeData = JSON.parse(jsonStr);
    } catch (e) {
      console.error('[generate-theme] Failed to parse response:', responseText);
      return jsonResponse({ error: 'Failed to parse theme response' }, 500);
    }

    if (!themeData.name || !themeData.colors) {
      return jsonResponse({ error: 'Invalid theme structure — missing name or colors' }, 500);
    }

    return jsonResponse({
      theme: {
        id: 'custom',
        name: themeData.name,
        description: themeData.description || '',
        colors: themeData.colors,
        typography: themeData.typography || {
          fontFamilyHeading: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          fontFamilyBody: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          fontFamilyMono: "'JetBrains Mono', 'Fira Code', monospace",
          fontWeightNormal: '400',
          fontWeightMedium: '500',
          fontWeightSemibold: '600',
          fontWeightBold: '700',
        },
        isCustom: true,
        keywords,
      },
    });
  } catch (err) {
    console.error('[generate-theme] Error:', err);
    return jsonResponse({ error: err.message }, 500);
  }
};

export const config = { path: '/api/generate-theme' };
