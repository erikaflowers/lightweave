import { exportTheme } from '../lib/store.js';

export default function ThemeCard({ theme, isActive, onSelect, onEdit, onDelete, isCustom }) {
  const c = theme.colors;

  const handleCopyJson = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(exportTheme(theme));
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    const json = exportTheme(theme);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${theme.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="lw-card-wrapper">
      <button
        type="button"
        className={`lw-card ${isActive ? 'lw-card-active' : ''}`}
        onClick={() => onSelect(theme.id)}
        title={theme.description}
      >
        <div className="lw-card-preview" style={{ background: c.backgroundPrimary }}>
          <div className="lw-card-sidebar" style={{ background: c.backgroundSecondary, borderRight: `1px solid ${c.borderDefault}` }}>
            <div className="lw-card-dot" style={{ background: c.accentPrimary }} />
            <div className="lw-card-line" style={{ background: c.textMuted, width: '60%' }} />
            <div className="lw-card-line" style={{ background: c.textMuted, width: '45%' }} />
          </div>
          <div className="lw-card-chat">
            <div className="lw-card-msg-user" style={{ background: c.backgroundTertiary }}>
              <div className="lw-card-line" style={{ background: c.textSecondary, width: '70%' }} />
            </div>
            <div className="lw-card-msg-asst">
              <div className="lw-card-line" style={{ background: c.textPrimary, width: '80%' }} />
              <div className="lw-card-line" style={{ background: c.textSecondary, width: '55%' }} />
            </div>
            <div className="lw-card-accent-bar" style={{ background: c.accentPrimary }} />
          </div>
        </div>
        <div className="lw-card-label">
          <span className="lw-card-name">{theme.name}</span>
          {isActive && (
            <svg className="lw-card-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          )}
        </div>
      </button>
      <div className="lw-card-actions">
        <button className="lw-card-action-btn" onClick={(e) => { e.stopPropagation(); onEdit(theme); }} title={isCustom ? 'Edit theme' : 'Customize a copy'}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button className="lw-card-action-btn" onClick={handleCopyJson} title="Copy JSON">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        </button>
        <button className="lw-card-action-btn" onClick={handleDownload} title="Download JSON">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
        {isCustom && (
          <button className="lw-card-action-btn lw-card-action-delete" onClick={(e) => { e.stopPropagation(); onDelete(theme.id); }} title="Delete theme">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
