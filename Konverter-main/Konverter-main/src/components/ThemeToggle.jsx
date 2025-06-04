import React from 'react';

// ThemeToggle: Allows users to switch between light and dark themes
const ThemeToggle = ({ theme, onThemeChange }) => {
  return (
    <div className="theme-toggle" role="region" aria-label="Theme Toggle">
      <button onClick={onThemeChange} aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} theme`}>
        {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
      </button>
    </div>
  );
};

export default ThemeToggle; 