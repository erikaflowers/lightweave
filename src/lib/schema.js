// Schema loader, validator, and utilities
// Derives COLOR_MAP, ALL_VARS, defaults, and AI prompt data from a schema object.

import defaultSchema from '../presets/full.js';

// ── Schema Resolution ────────────────────────────────────────────────────

let _activeSchema = null;

/**
 * Get the active schema. Falls back to the full preset.
 */
export function getSchema() {
  if (_activeSchema) return _activeSchema;
  return defaultSchema;
}

/**
 * Set the active schema for this Lightweave instance.
 */
export function setSchema(schema) {
  validateSchema(schema);
  _activeSchema = schema;
}

// ── Validation ───────────────────────────────────────────────────────────

/**
 * Validate that a schema object has the required structure.
 * Throws on invalid schema.
 */
export function validateSchema(schema) {
  if (!schema || typeof schema !== 'object') {
    throw new Error('Schema must be an object');
  }
  if (!Array.isArray(schema.groups) || schema.groups.length === 0) {
    throw new Error('Schema must have at least one group');
  }
  for (const group of schema.groups) {
    if (!group.id || !group.label) {
      throw new Error(`Group missing required fields (id, label): ${JSON.stringify(group)}`);
    }
    if (!Array.isArray(group.colors) || group.colors.length === 0) {
      throw new Error(`Group "${group.id}" must have at least one color`);
    }
    for (const color of group.colors) {
      if (!color.key || !color.cssVar || !color.label) {
        throw new Error(`Color in group "${group.id}" missing required fields (key, cssVar, label): ${JSON.stringify(color)}`);
      }
    }
  }
}

// ── Derived Utilities ────────────────────────────────────────────────────

/**
 * Build a COLOR_MAP (key → cssVar) from a schema.
 */
export function getColorMap(schema) {
  const map = {};
  for (const group of schema.groups) {
    for (const color of group.colors) {
      map[color.key] = color.cssVar;
    }
  }
  return map;
}

/**
 * Get all CSS variable names from a schema.
 */
export function getAllVars(schema) {
  return Object.values(getColorMap(schema));
}

/**
 * Get default color values from a schema (key → default hex).
 */
export function getDefaults(schema) {
  const defaults = {};
  for (const group of schema.groups) {
    for (const color of group.colors) {
      if (color.default) {
        defaults[color.key] = color.default;
      }
    }
  }
  return defaults;
}

/**
 * Get all color keys defined in a schema.
 */
export function getColorKeys(schema) {
  return schema.groups.flatMap(g => g.colors.map(c => c.key));
}

/**
 * Get the total number of colors in a schema.
 */
export function getColorCount(schema) {
  return schema.groups.reduce((sum, g) => sum + g.colors.length, 0);
}

/**
 * Get the storage keys for a schema.
 */
export function getStorageKeys(schema) {
  const prefix = schema.storageKey || 'lw';
  return {
    theme: `${prefix}_theme`,
    customThemes: `${prefix}_custom_themes`,
  };
}

/**
 * Build a flat list of all color definitions from a schema.
 * Useful for AI prompt generation.
 */
export function getFlatColors(schema) {
  return schema.groups.flatMap(g =>
    g.colors.map(c => ({
      ...c,
      groupId: g.id,
      groupLabel: g.label,
    }))
  );
}
