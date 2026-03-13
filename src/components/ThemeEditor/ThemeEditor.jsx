import { useState, useEffect, useCallback, useRef } from 'react';
import { applyTheme, schema } from '../../lib/store.js';
import ColorPickerPopover from './ColorPickerPopover.jsx';
import ColorRow from './ColorRow.jsx';

// Use schema.groups instead of hardcoded COLOR_GROUPS
const colorGroups = schema.groups;

export default function ThemeEditor({ theme, onSave, onCancel }) {
  const [draftTheme, setDraftTheme] = useState(() => ({
    ...theme,
    colors: { ...theme.colors },
    typography: { ...(theme.typography || {}) },
  }));

  const originalThemeRef = useRef(theme);
  const [activeColor, setActiveColor] = useState(null);
  const [expandedGroups, setExpandedGroups] = useState([colorGroups[0]?.id]);
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(draftTheme.name);

  // Live preview
  useEffect(() => {
    applyTheme(draftTheme);
  }, [draftTheme]);

  const handleColorChange = useCallback((colorKey, newValue) => {
    setDraftTheme(prev => ({
      ...prev,
      colors: { ...prev.colors, [colorKey]: newValue }
    }));
  }, []);

  const handleCancel = useCallback(() => {
    applyTheme(originalThemeRef.current);
    onCancel();
  }, [onCancel]);

  const handleSave = useCallback(() => {
    const themeToSave = { ...draftTheme, name: nameValue };
    onSave(themeToSave);
  }, [draftTheme, nameValue, onSave]);

  const toggleGroup = useCallback((groupId) => {
    setExpandedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  }, []);

  const handleColorClick = useCallback((colorKey, position) => {
    setActiveColor(prev => prev?.key === colorKey ? null : { key: colorKey, position });
  }, []);

  const closeColorPicker = useCallback(() => {
    setActiveColor(null);
  }, []);

  const handleNameSave = useCallback(() => {
    setDraftTheme(prev => ({ ...prev, name: nameValue }));
    setEditingName(false);
  }, [nameValue]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={handleCancel}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Cancel
        </button>
        <button style={styles.saveButton} onClick={handleSave}>
          Save Theme
        </button>
      </div>

      <div style={styles.nameSection}>
        {editingName ? (
          <input
            type="text"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleNameSave();
              if (e.key === 'Escape') {
                setNameValue(draftTheme.name);
                setEditingName(false);
              }
            }}
            onBlur={handleNameSave}
            style={styles.nameInput}
            autoFocus
          />
        ) : (
          <h2
            style={styles.themeName}
            onClick={() => setEditingName(true)}
            title="Click to edit name"
          >
            {draftTheme.name}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.4 }}>
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </h2>
        )}
        {draftTheme.keywords && (
          <p style={styles.keywords}>Generated from: "{draftTheme.keywords}"</p>
        )}
      </div>

      <div style={styles.colorGroups}>
        {colorGroups.map((group) => (
          <div key={group.id} style={styles.accordion}>
            <button style={styles.accordionHeader} onClick={() => toggleGroup(group.id)}>
              <div style={styles.accordionHeaderContent}>
                <span style={styles.accordionLabel}>{group.label}</span>
                <span style={styles.accordionDesc}>{group.description}</span>
              </div>
              <div style={styles.accordionRight}>
                <span style={styles.colorCount}>{group.colors.length}</span>
                <svg
                  width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  style={{
                    color: 'var(--lw-text-muted)',
                    transition: 'transform 0.2s ease',
                    transform: expandedGroups.includes(group.id) ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </button>
            <div
              style={{
                ...styles.accordionContent,
                maxHeight: expandedGroups.includes(group.id) ? '1000px' : '0',
                opacity: expandedGroups.includes(group.id) ? 1 : 0,
                padding: expandedGroups.includes(group.id) ? '12px 16px' : '0 16px'
              }}
            >
              {group.colors.map((colorDef) => (
                <ColorRow
                  key={colorDef.key}
                  colorKey={colorDef.key}
                  label={colorDef.label}
                  description={colorDef.description}
                  value={draftTheme.colors[colorDef.key] || '#000000'}
                  isActive={activeColor?.key === colorDef.key}
                  onSwatchClick={handleColorClick}
                  onChange={handleColorChange}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {activeColor && (
        <ColorPickerPopover
          color={draftTheme.colors[activeColor.key]}
          onChange={(value) => handleColorChange(activeColor.key, value)}
          onClose={closeColorPicker}
          position={activeColor.position}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: 0,
    position: 'relative',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid var(--lw-border-light)',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--lw-text-secondary)',
    background: 'var(--lw-bg-secondary)',
    border: '1px solid var(--lw-border)',
    borderRadius: '6px',
    cursor: 'pointer',
    fontFamily: 'var(--lw-font-body)',
    transition: 'all 0.15s ease',
  },
  saveButton: {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#ffffff',
    background: 'var(--lw-accent)',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontFamily: 'var(--lw-font-body)',
    transition: 'all 0.15s ease',
  },
  nameSection: {
    marginBottom: '24px',
  },
  themeName: {
    fontSize: '20px',
    fontWeight: 600,
    color: 'var(--lw-text-primary)',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    fontFamily: 'var(--lw-font-body)',
  },
  nameInput: {
    fontSize: '20px',
    fontWeight: 600,
    color: 'var(--lw-text-primary)',
    background: 'var(--lw-bg-secondary)',
    border: '1px solid var(--lw-accent)',
    borderRadius: '4px',
    padding: '4px 8px',
    fontFamily: 'var(--lw-font-body)',
    outline: 'none',
    width: '300px',
  },
  keywords: {
    fontSize: '13px',
    color: 'var(--lw-text-muted)',
    margin: '4px 0 0 0',
    fontStyle: 'italic',
  },
  colorGroups: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  accordion: {
    border: '1px solid var(--lw-border)',
    borderRadius: '8px',
    overflow: 'hidden',
    background: 'var(--lw-bg-card)',
  },
  accordionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '14px 16px',
    background: 'var(--lw-bg-secondary)',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--lw-font-body)',
    textAlign: 'left',
    transition: 'background 0.15s ease',
  },
  accordionHeaderContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  accordionLabel: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--lw-text-primary)',
  },
  accordionDesc: {
    fontSize: '12px',
    color: 'var(--lw-text-muted)',
  },
  accordionRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  colorCount: {
    fontSize: '12px',
    color: 'var(--lw-text-muted)',
  },
  accordionContent: {
    overflow: 'hidden',
    transition: 'all 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
};
