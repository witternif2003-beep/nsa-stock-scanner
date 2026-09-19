import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';

function renderApp() {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', renderApp);
    } else {
      setTimeout(renderApp, 20);
    }
    return;
  }
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
