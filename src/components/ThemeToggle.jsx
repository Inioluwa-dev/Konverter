import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

// ThemeToggle: Allows users to switch between light and dark themes
const ThemeToggle = ({ theme, onThemeChange }) => {
  return (
    <div className="theme-toggle" role="region" aria-label="Theme Toggle">
      <button 
        onClick={onThemeChange} 
        aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} theme`}
        className="theme-toggle-button"
      >
        <i className={`bi ${theme === 'light' ? 'bi-moon-fill' : 'bi-sun-fill'}`}></i>
        <span className="theme-toggle-text">
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle; 