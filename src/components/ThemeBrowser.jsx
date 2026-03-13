import { themeList, themeGroups } from '../themes/index.js';
import ThemeCard from './ThemeCard.jsx';

export default function ThemeBrowser({ themeId, setTheme, customThemes, onEdit, onDelete, onCustomize }) {
  return (
    <div className="lw-browser">
      {/* Custom Themes */}
      {customThemes.length > 0 && (
        <div className="lw-group">
          <h3 className="lw-group-label">Custom</h3>
          <div className="lw-grid">
            {customThemes.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                isActive={theme.id === themeId}
                onSelect={setTheme}
                onEdit={onEdit}
                onDelete={onDelete}
                isCustom
              />
            ))}
          </div>
        </div>
      )}

      {/* Built-in Theme Groups */}
      {themeGroups.map((group) => (
        <div key={group.label} className="lw-group">
          <h3 className="lw-group-label">{group.label}</h3>
          <div className="lw-grid">
            {themeList.slice(group.start, group.start + group.count).map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                isActive={theme.id === themeId}
                onSelect={setTheme}
                onEdit={onCustomize}
                onDelete={() => {}}
                isCustom={false}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
