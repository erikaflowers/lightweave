import { useState } from 'react';
import { CHAT_FONTS, getChatFont, applyChatFont } from '../lib/chatFont.js';

export default function FontPicker() {
  const [chatFont, setChatFont] = useState(getChatFont);

  const handleChange = (id) => {
    applyChatFont(id);
    setChatFont(id);
  };

  return (
    <div className="lw-font-picker">
      <span className="lw-font-picker-label">Reading Font</span>
      <div className="lw-font-picker-options">
        {CHAT_FONTS.map((font) => (
          <button
            key={font.id}
            className={`lw-font-picker-btn ${chatFont === font.id ? 'lw-font-picker-btn-active' : ''}`}
            onClick={() => handleChange(font.id)}
            style={{ fontFamily: font.family }}
          >
            {font.label}
          </button>
        ))}
      </div>
    </div>
  );
}
