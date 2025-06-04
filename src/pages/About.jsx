import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-page" role="region" aria-label="About Page">
      <h1>About Konverter</h1>
      
      <section className="about-section">
        <h2>What is Konverter?</h2>
        <p>
          Konverter is a powerful web-based tool designed to simplify the conversion between CSV and JSON formats.
          Whether you're a developer, data analyst, or just someone who needs to work with different data formats,
          Konverter makes the process seamless and efficient.
        </p>
      </section>

      <section className="features-section">
        <h2>Key Features</h2>
        <ul>
          <li>
            <strong>Bidirectional Conversion:</strong> Convert between CSV and JSON formats with ease
          </li>
          <li>
            <strong>Custom Delimiters:</strong> Support for various CSV delimiters (comma, semicolon, tab)
          </li>
          <li>
            <strong>File Handling:</strong> Upload and download files directly in your browser
          </li>
          <li>
            <strong>Accessibility:</strong> Built with accessibility in mind, supporting screen readers and keyboard navigation
          </li>
          <li>
            <strong>Theme Support:</strong> Choose between light and dark themes for comfortable viewing
          </li>
        </ul>
      </section>

      <section className="usage-section">
        <h2>How to Use</h2>
        <ol>
          <li>Navigate to the Converter page</li>
          <li>Choose your input method (paste or upload)</li>
          <li>Select the appropriate delimiter for CSV files</li>
          <li>Click the conversion button</li>
          <li>Download or copy your converted output</li>
        </ol>
      </section>

      <div className="navigation-buttons">
        <Link to="/" className="secondary-button left" role="button" aria-label="Back to Home">
          Back to Home
        </Link>
        <Link to="/converter" className="primary-button right" role="button" aria-label="Try Converter">
          Try Converter
        </Link>
      </div>
    </div>
  );
};

export default About; 