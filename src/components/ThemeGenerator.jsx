import { useState, useRef } from 'react';
import { apiPost } from '../lib/api.js';
import { importTheme } from '../lib/store.js';

export default function ThemeGenerator({ onThemeGenerated }) {
  const [keywords, setKeywords] = useState('');
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState(null);
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState(null);
  const fileRef = useRef(null);

  const handleGenerate = async () => {
    if (!keywords.trim() || generating) return;
    setGenerating(true);
    setGenError(null);
    try {
      const result = await apiPost('/api/generate-theme', { keywords: keywords.trim() });
      if (result.error) throw new Error(result.error);
      onThemeGenerated(result.theme);
      setKeywords('');
    } catch (err) {
      setGenError(err.message || 'Failed to generate theme');
    } finally {
      setGenerating(false);
    }
  };

  const handleImport = () => {
    setImportError(null);
    try {
      const theme = importTheme(importText);
      onThemeGenerated(theme);
      setImportText('');
      setShowImport(false);
    } catch (err) {
      setImportError(err.message);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const theme = importTheme(evt.target.result);
        onThemeGenerated(theme);
        setShowImport(false);
      } catch (err) {
        setImportError(err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="lw-gen">
      <div className="lw-gen-row">
        <input
          type="text"
          className="lw-gen-input"
          placeholder="Describe a theme... (e.g. ocean sunset, cyberpunk neon)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleGenerate(); }}
          disabled={generating}
        />
        <button
          className="lw-gen-btn"
          onClick={handleGenerate}
          disabled={generating || !keywords.trim()}
        >
          {generating ? (
            <span className="lw-gen-spinner" />
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          )}
          {generating ? 'Generating...' : 'Generate'}
        </button>
        <button
          className="lw-gen-import-btn"
          onClick={() => setShowImport(!showImport)}
          title="Import theme from JSON"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Import
        </button>
      </div>
      {genError && <p className="lw-gen-error">{genError}</p>}

      {showImport && (
        <div className="lw-import-panel">
          <textarea
            className="lw-import-textarea"
            placeholder="Paste theme JSON here..."
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            rows={6}
          />
          <div className="lw-import-actions">
            <button className="lw-gen-btn" onClick={handleImport} disabled={!importText.trim()}>
              Import JSON
            </button>
            <span className="lw-import-or">or</span>
            <button className="lw-gen-import-btn" onClick={() => fileRef.current?.click()}>
              Upload .json file
            </button>
            <input ref={fileRef} type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} />
          </div>
          {importError && <p className="lw-gen-error">{importError}</p>}
        </div>
      )}
    </div>
  );
}
