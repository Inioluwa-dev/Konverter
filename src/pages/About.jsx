import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import SEO from '../components/SEO';
import '../styles/about.css';

const About = () => {
  const { theme } = useTheme();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Konverter - Professional Data Format & Code Minifier",
    "description": "Learn about Konverter, a modern web application designed to help developers and data analysts easily convert between different data formats and minify code.",
    "url": "https://Kon-verter.web.app/about",
    "mainEntity": {
      "@type": "WebApplication",
      "name": "Konverter",
      "description": "Professional tool for converting between CSV and JSON formats and minifying HTML, CSS, JavaScript, and JSX code",
      "url": "https://Kon-verter.web.app",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "creator": {
        "@type": "Organization",
        "name": "Comibyte Team",
        "url": "https://Kon-verter.web.app"
      },
      "version": "1.0.2",
      "dateCreated": "2025-01-27",
      "dateModified": "2025-01-27"
    }
  };

  return (
    <>
      <SEO
        title="About Konverter - Professional Data Format & Code Minifier"
        description="Learn about Konverter, a modern web application designed to help developers and data analysts easily convert between different data formats and minify code. Features include CSV/JSON conversion, code minification, and more."
        keywords="about konverter, data converter, CSV JSON converter, code minifier, developer tools, data format conversion, file converter, comibyte team, web application"
        url="/about"
        structuredData={structuredData}
      />
      <div className={`about-page ${theme === 'dark' ? 'dark' : ''}`}>
        <div className="about-header">
          <h1>About Konverter</h1>
          <p>A powerful tool for converting and minifying your data formats</p>
        </div>
        
        <section className="about-section">
          <h2 className="section-header">What is Konverter?</h2>
          <p>Konverter is a modern web application designed to help developers and data analysts easily convert between different data formats. Whether you're working with CSV files, JSON data, or need to minify your code, Konverter provides a simple and efficient solution.</p>
        </section>
        
        <section className="features-section">
          <h2 className="section-header">Key Features</h2>
          <div className="feature-categories">
            <div className="feature-category">
              <h3 className="subsection-header">Data Conversion</h3>
              <ul>
                <li>CSV to JSON conversion</li>
                <li>JSON to CSV conversion</li>
                <li>Support for custom delimiters</li>
                <li>Batch processing capabilities</li>
              </ul>
            </div>
            
            <div className="feature-category">
              <h3 className="subsection-header">Code Minification</h3>
              <ul>
                <li>JavaScript minification</li>
                <li>CSS minification</li>
                <li>HTML minification</li>
                <li>Preserve important comments</li>
              </ul>
            </div>
            
            <div className="feature-category">
              <h3 className="subsection-header">User Experience</h3>
              <ul>
                <li>Real-time conversion</li>
                <li>Dark mode support</li>
                <li>Responsive design</li>
                <li>Copy to clipboard functionality</li>
              </ul>
            </div>
          </div>
        </section>
        
        <section className="usage-section">
          <h2 className="section-header">How to Use</h2>
          <div className="usage-categories">
            <div className="usage-category">
              <h3 className="subsection-header">Data Conversion</h3>
              <ol>
                <li>Select your conversion type (CSV to JSON or JSON to CSV)</li>
                <li>Paste your data or upload a file</li>
                <li>Choose your delimiter (for CSV)</li>
                <li>Click convert and get your result</li>
              </ol>
            </div>
            
            <div className="usage-category">
              <h3 className="subsection-header">Code Minification</h3>
              <ol>
                <li>Select the type of code to minify</li>
                <li>Paste your code or upload a file</li>
                <li>Configure minification options</li>
                <li>Get your minified code</li>
              </ol>
            </div>
          </div>
        </section>
        
        <section className="developer-section">
          <h2 className="section-header">Developer Information</h2>
          <div className="developer-info">
            <p><strong>Developer:</strong> Mr Heritage</p>
            <p><strong>Version:</strong> 1.0.2</p>
            <p><strong>Last Updated:</strong> January 2025</p>
            <p><strong>Technologies Used:</strong> React, CSS3, Vite, JavaScript Libraries</p>
          </div>
        </section>
        
        <div className="navigation-buttons">
          <Link to="/" className="primary-button">Back to Home</Link>
          <Link to="/converter" className="secondary-button">Try Converter</Link>
        </div>
      </div>
    </>
  );
};

export default About;