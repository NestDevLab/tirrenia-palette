// FIX: All components, types, and logic were moved to separate files (App.tsx, components/*.tsx, types.ts).
// This file is now a clean entry point that renders the main App component.
// This resolves all 'React' and 'ReactDOM' UMD global errors by using proper imports
// and fixes the project structure by removing duplicated code.
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
