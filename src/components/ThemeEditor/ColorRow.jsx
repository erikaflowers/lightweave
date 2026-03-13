import { useRef, useState, useEffect } from 'react';

function ColorRow({ colorKey, label, description, value, isActive, onSwatchClick, onChange }) {
  const rowRef = useRef(null);
  const [localValue, setLocalValue] = useState(value);

  const handleSwatchClick = () => {
    const rect = rowRef.current.getBoundingClientRect();
    onSwatchClick(colorKey, {
      top: rect.top,
      left: rect.right + 12,
      bottom: rect.bottom
    });
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
      onChange(colorKey, newValue);
    }
    if (newValue.startsWith('rgba(')) {
      onChange(colorKey, newValue);
    }
  };

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleBlur = () => {
    setLocalValue(value);
  };

  const isRgba = value.startsWith('rgba');

  return (
    <div
      ref={rowRef}
      style={{
        ...styles.row,
        ...(isActive ? styles.rowActive : {})
      }}
    >
      <button
        style={{
          ...styles.swatch,
          backgroundColor: value,
          ...(isActive ? styles.swatchActive : {})
        }}
        onClick={handleSwatchClick}
        aria-label={`Edit ${label}`}
        title={`Click to edit ${label}`}
      />

      <div style={styles.info}>
        <span style={styles.label}>{label}</span>
        <span style={styles.description}>{description}</span>
      </div>

      <input
        type="text"
        value={localValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        style={styles.input}
        placeholder={isRgba ? 'rgba(...)' : '#000000'}
        spellCheck={false}
      />
    </div>
  );
}

const styles = {
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 12px',
    borderRadius: '6px',
    transition: 'background 0.15s ease'
  },
  rowActive: {
    background: 'var(--lw-accent-bg)'
  },
  swatch: {
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    border: '2px solid var(--lw-border)',
    cursor: 'pointer',
    transition: 'transform 0.15s ease, border-color 0.15s ease',
    flexShrink: 0
  },
  swatchActive: {
    borderColor: 'var(--lw-accent)',
    transform: 'scale(1.05)'
  },
  info: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '1px'
  },
  label: {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--lw-text-primary)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  description: {
    fontSize: '11px',
    color: 'var(--lw-text-muted)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  input: {
    width: '110px',
    padding: '6px 8px',
    fontSize: '12px',
    fontFamily: 'var(--lw-font-mono, monospace)',
    color: 'var(--lw-text-primary)',
    background: 'var(--lw-bg-secondary)',
    border: '1px solid var(--lw-border)',
    borderRadius: '4px',
    textAlign: 'center',
    flexShrink: 0
  }
};

export default ColorRow;
