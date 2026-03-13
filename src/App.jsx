import { useState } from 'react';
import useTheme from './hooks/useTheme.js';
import { applyTheme } from './lib/store.js';
import { themeList } from './themes/index.js';
import ThemeBrowser from './components/ThemeBrowser.jsx';
import ThemeGenerator from './components/ThemeGenerator.jsx';
import ThemeEditor from './components/ThemeEditor/ThemeEditor.jsx';
import FontPicker from './components/FontPicker.jsx';
import LivePreview from './components/LivePreview.jsx';

export default function App() {
  const { themeId, setTheme, customThemes, saveCustomTheme, deleteCustomTheme } = useTheme();
  const [editingTheme, setEditingTheme] = useState(null);

  const handleThemeGenerated = (theme) => {
    saveCustomTheme(theme);
  };

  const handleEdit = (theme) => {
    setEditingTheme(theme);
  };

  const handleCustomize = (theme) => {
    const copy = {
      ...theme,
      id: 'custom',
      name: `${theme.name} (Custom)`,
      colors: { ...theme.colors },
      typography: { ...(theme.typography || {}) },
      isCustom: true,
    };
    setEditingTheme(copy);
  };

  const handleEditorSave = (updatedTheme) => {
    saveCustomTheme(updatedTheme);
    setEditingTheme(null);
  };

  const handleEditorCancel = () => {
    const current = customThemes.find(t => t.id === themeId) || themeList.find(t => t.id === themeId) || themeList[0];
    applyTheme(current);
    setEditingTheme(null);
  };

  const handleDelete = (id) => {
    if (!confirm('Delete this custom theme?')) return;
    deleteCustomTheme(id);
  };

  // Editor view
  if (editingTheme) {
    return (
      <div className="lw-app">
        <div className="lw-app-body">
          <div className="lw-editor-container">
            <ThemeEditor
              theme={editingTheme}
              onSave={handleEditorSave}
              onCancel={handleEditorCancel}
            />
          </div>
        </div>
      </div>
    );
  }

  // Main view
  return (
    <div className="lw-app">
      <header className="lw-header">
        <div className="lw-header-left">
          <h1 className="lw-logo">Lightweave</h1>
          <span className="lw-tagline">Theme Creator</span>
        </div>
        <FontPicker />
      </header>

      <div className="lw-app-body">
        <ThemeGenerator onThemeGenerated={handleThemeGenerated} />

        <div className="lw-main">
          <div className="lw-main-browser">
            <ThemeBrowser
              themeId={themeId}
              setTheme={setTheme}
              customThemes={customThemes}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onCustomize={handleCustomize}
            />
          </div>
          <div className="lw-main-preview">
            <LivePreview />
          </div>
        </div>
      </div>
    </div>
  );
}
