import { useEffect, useRef, useMemo, useState } from 'react';
import { HexColorPicker, RgbaColorPicker } from 'react-colorful';

function ColorPickerPopover({ color, onChange, onClose, position }) {
  const popoverRef = useRef(null);
  const [hexValue, setHexValue] = useState(color.startsWith('#') ? color : '#000000');

  const isRgba = color.startsWith('rgba');

  const parseRgba = (rgbaStr) => {
    const match = rgbaStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]+)?\)/);
    if (match) {
      return {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3]),
        a: match[4] ? parseFloat(match[4]) : 1
      };
    }
    return { r: 0, g: 0, b: 0, a: 0.6 };
  };

  const rgbaToString = (rgba) =>
    `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;

  const [rgbaValue, setRgbaValue] = useState(() => isRgba ? parseRgba(color) : null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        onClose();
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const adjustedPosition = useMemo(() => {
    const popoverHeight = 280;
    const popoverWidth = 240;
    const padding = 16;
    let top = position.top;
    let left = position.left;
    if (top + popoverHeight > window.innerHeight - padding) {
      top = Math.max(padding, window.innerHeight - popoverHeight - padding);
    }
    if (left + popoverWidth > window.innerWidth - padding) {
      left = position.left - popoverWidth - 44;
    }
    return { top, left };
  }, [position]);

  const handleHexChange = (newColor) => {
    setHexValue(newColor);
    onChange(newColor);
  };

  const handleRgbaChange = (newRgba) => {
    setRgbaValue(newRgba);
    onChange(rgbaToString(newRgba));
  };

  const handleHexInput = (e) => {
    const value = e.target.value;
    setHexValue(value);
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      onChange(value);
    }
  };

  return (
    <div
      ref={popoverRef}
      style={{
        ...styles.popover,
        top: adjustedPosition.top,
        left: adjustedPosition.left
      }}
    >
      {isRgba ? (
        <RgbaColorPicker
          color={rgbaValue}
          onChange={handleRgbaChange}
          style={styles.picker}
        />
      ) : (
        <HexColorPicker
          color={hexValue}
          onChange={handleHexChange}
          style={styles.picker}
        />
      )}

      {!isRgba && (
        <div style={styles.footer}>
          <input
            type="text"
            value={hexValue}
            onChange={handleHexInput}
            style={styles.hexInput}
            maxLength={7}
            spellCheck={false}
          />
        </div>
      )}

      <button style={styles.closeButton} onClick={onClose}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

const styles = {
  popover: {
    position: 'fixed',
    zIndex: 1100,
    background: 'var(--lw-bg-card)',
    border: '1px solid var(--lw-border)',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)'
  },
  picker: {
    width: '200px',
    height: '200px'
  },
  footer: {
    marginTop: '12px',
    display: 'flex',
    justifyContent: 'center'
  },
  hexInput: {
    width: '100%',
    padding: '8px 12px',
    fontSize: '14px',
    fontFamily: 'var(--lw-font-mono, monospace)',
    color: 'var(--lw-text-primary)',
    background: 'var(--lw-bg-secondary)',
    border: '1px solid var(--lw-border)',
    borderRadius: '6px',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  closeButton: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'var(--lw-text-muted)',
    transition: 'color 0.15s ease, background 0.15s ease'
  }
};

export default ColorPickerPopover;
