import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import SEO from '../components/SEO';
import '../styles/home.css';

const Home = () => {
  const { theme } = useTheme();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Konverter - Professional Data Format & Code Minifier",
    "description": "Professional tool for converting between CSV and JSON formats and minifying HTML, CSS, JavaScript, and JSX code, with advanced features like file upload, delimiter selection, code formatting, and dark mode support.",
    "url": "https://Kon-verter.web.app",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "CSV to JSON conversion",
      "JSON to CSV conversion",
      "Code minification",
      "File upload support",
      "Custom delimiter selection",
      "Dark mode support",
      "Real-time conversion",
      "Copy to clipboard",
      "Download converted files"
    ],
    "creator": {
      "@type": "Organization",
      "name": "Comibyte Team",
      "url": "https://Kon-verter.web.app"
    }
  };

  return (
    <>
      <SEO
        title="Konverter - Professional Data Format & Code Minifier"
        description="Convert between CSV and JSON formats or minify HTML, CSS, JavaScript, and JSX code with our professional tool. Features include file upload, delimiter selection, code formatting, dark mode, and real-time conversion. Perfect for developers and data analysts."
        keywords="CSV to JSON, JSON to CSV, data converter, file converter, CSV converter, JSON converter, code minifier, HTML minifier, CSS minifier, JavaScript minifier, JSX minifier, data format, delimiter selection, file upload, dark mode, konverter, comibyte"
        url="/"
        structuredData={structuredData}
      />
      <div className={`home-page ${theme === 'dark' ? 'dark' : ''}`} role="region" aria-label="Home Page">
        <h1>Welcome to Konverter</h1>
        <p>A powerful toolkit for converting data formats and optimizing your code. Simple, fast, and free to use.</p>
        
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Data Converter</h3>
            <ul>
              <li>Convert between CSV and JSON formats</li>
              <li>Support for custom delimiters</li>
              <li>Batch processing capabilities</li>
              <li>Real-time conversion</li>
            </ul>
            <Link to="/converter" className="feature-link">Try Converter</Link>
          </div>
          
          <div className="feature-card">
            <h3>Code Minifier</h3>
            <ul>
              <li>Minify JavaScript code</li>
              <li>Minify CSS code</li>
              <li>Minify HTML code</li>
              <li>Preserve important comments</li>
            </ul>
            <Link to="/minifier" className="feature-link">Try Minifier</Link>
          </div>
          
          <div className="feature-card">
            <h3>User Experience</h3>
            <ul>
              <li>Dark mode support</li>
              <li>Responsive design</li>
              <li>Copy to clipboard</li>
              <li>Download options</li>
            </ul>
            <Link to="/about" className="feature-link">Learn More</Link>
          </div>
        </div>
        
        <div className="common-features">
          <h2>Common Features</h2>
          <ul>
            <li>Free to use</li>
            <li>No data upload required</li>
            <li>Works in your browser</li>
            <li>Regular updates</li>
          </ul>
        </div>
        
        <div className="navigation-buttons">
          <Link to="/converter" className="primary-button">
            <i className="bi bi-arrow-left-right"></i>Start Converting
          </Link>
          <Link to="/minifier" className="secondary-button">
            <i className="bi bi-code-slash"></i>Minify Code
          </Link>
          <Link to="/about" className="secondary-button">
            <i className="bi bi-info-circle"></i>Learn More
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;