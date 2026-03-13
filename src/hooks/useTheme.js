import { useState, useCallback } from 'react';
import { themeList } from '../themes/index.js';
import {
  getTheme, getThemeId, setThemeId,
  saveCustomTheme as storeSaveCustom,
  deleteCustomTheme as storeDeleteCustom,
  getCustomThemes,
} from '../lib/store.js';

export default function useTheme() {
  const [themeId, setLocal] = useState(getThemeId);
  const [customThemes, setCustomThemes] = useState(getCustomThemes);

  const setTheme = useCallback((id) => {
    setThemeId(id);
    setLocal(id);
  }, []);

  const saveCustomTheme = useCallback((theme) => {
    const id = storeSaveCustom(theme);
    setLocal(id);
    setCustomThemes(getCustomThemes());
    return id;
  }, []);

  const deleteCustomTheme = useCallback((id) => {
    storeDeleteCustom(id);
    setLocal(getThemeId());
    setCustomThemes(getCustomThemes());
  }, []);

  return {
    theme: getTheme(themeId),
    themeId,
    setTheme,
    themes: themeList,
    customThemes,
    saveCustomTheme,
    deleteCustomTheme,
  };
}
