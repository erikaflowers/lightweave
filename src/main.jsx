import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './lightweave.css';
import './lib/store.js';
import './lib/chatFont.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
