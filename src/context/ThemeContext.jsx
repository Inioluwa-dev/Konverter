/**
 * Theme Context Provider
 * Copyright (c) 2025 Comibyte Team. All Rights Reserved.
 * 
 * PROPRIETARY AND CONFIDENTIAL
 * 
 * This software is the exclusive property of Comibyte Team.
 * Unauthorized copying, modification, distribution, or use of this software,
 * via any medium, is strictly prohibited.
 * 
 * This software was developed with significant time and effort.
 * Any unauthorized use, reproduction, or distribution of this software
 * or its contents is strictly prohibited and may result in severe legal penalties.
 * 
 * For licensing inquiries, please contact: Misterhge@gmail.com
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    // Update document attributes when theme changes
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.toggle('dark', theme === 'dark');
    // Save theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 