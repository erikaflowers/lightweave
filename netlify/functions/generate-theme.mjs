// Lightweave AI Theme Generator — Netlify Function
// POST /api/generate-theme { keywords: "ocean sunset" }
// Returns { theme: { id, name, description, colors, typography, isCustom, keywords } }

const SYSTEM_PROMPT = `You are an expert UI/UX designer specializing in color theory and accessibility. You create beautiful, cohesive color palettes for software applications. You understand contrast ratios, color harmony, and how to evoke specific moods through color.

IMPORTANT: You MUST respond with valid JSON only. No markdown code fences, no explanation, just the raw JSON object.`;

const THEME_PROMPT = `Generate a complete color theme for an AI chat application based on these keywords: "{keywords}"

The theme should evoke the mood, feeling, or aesthetic suggested by those keywords while remaining functional and readable for a productivity app.

Return a JSON object with this exact structure:

{
  "name": "Theme Name (2-4 words, creative and evocative)",
  "description": "Brief description (under 60 chars)",
  "colors": {
    "backgroundPrimary": "#hex - main app background",
    "backgroundSecondary": "#hex - secondary/sidebar backgrounds",
    "backgroundTertiary": "#hex - tertiary/deeper backgrounds",
    "backgroundCard": "#hex - card/elevated surfaces",
    "textPrimary": "#hex - main text color",
    "textSecondary": "#hex - secondary text",
    "textMuted": "#hex - muted/placeholder text",
    "borderDefault": "#hex - default borders",
    "borderLight": "#hex - subtle borders",
    "accentPrimary": "#hex - primary accent/buttons",
    "accentPrimaryHover": "#hex - accent hover state",
    "accentSecondary": "#hex - secondary accent",
    "accentBackground": "#hex - accent tinted background",
    "accentBorder": "#hex - accent colored border",
    "buttonText": "#hex - text on accent buttons",
    "sidebarBackground": "#hex - sidebar background",
    "sidebarText": "#hex - sidebar text",
    "sidebarTextMuted": "#hex - sidebar muted text",
    "sidebarAccent": "#hex - sidebar accent color",
    "sidebarAccentText": "#hex - text on sidebar accent",
    "sidebarBorder": "#hex - sidebar borders",
    "success": "#hex - success state",
    "successBackground": "#hex - success background tint",
    "error": "#hex - error state",
    "errorBackground": "#hex - error background tint",
    "warning": "#hex - warning state",
    "warningBackground": "#hex - warning background tint",
    "overlayBackdrop": "rgba(r,g,b,a) - modal backdrop"
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
2. The sidebar should feel cohesive but distinct from the main content area
3. Accent colors should pop but not overwhelm
4. Success/error/warning colors should be recognizable but fit the theme
5. All hex values must be valid 6-character hex codes (e.g., #FF5500)
6. The theme should be FUNCTIONAL - users need to read and write in this app for hours

Respond with ONLY the JSON object, no other text.`;

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
          { role: 'user', content: THEME_PROMPT.replace('{keywords}', keywords) }
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
