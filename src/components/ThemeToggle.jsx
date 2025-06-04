import React from 'react';
import { useTheme } from '../context/ThemeContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

// ThemeToggle: Allows users to switch between light and dark themes
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle" role="region" aria-label="Theme Toggle">
      <button 
        onClick={toggleTheme} 
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