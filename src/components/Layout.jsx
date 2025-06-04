import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Layout = ({ children, theme, onThemeChange }) => {
  return (
    <div className="layout">
      <header className="header" role="banner">
        <nav className="nav" role="navigation" aria-label="Main Navigation">
          <Link to="/" className="logo" aria-label="Konverter Home">
            Konverter
          </Link>
          <div className="nav-links">
            <Link to="/" aria-label="Home">Home</Link>
            <Link to="/converter" aria-label="Converter">Converter</Link>
            <Link to="/about" aria-label="About">About</Link>
          </div>
          <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
        </nav>
      </header>

      <main className="main-content" role="main">
        {children}
      </main>

      <footer className="footer" role="contentinfo">
        <div className="footer-content">
          <p style={{ color: 'white' }}>&copy; {new Date().getFullYear()} Comibyte Team. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/about" aria-label="About">About</Link>
            <a href="https://github.com/Inioluwa-dev/konverter" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 