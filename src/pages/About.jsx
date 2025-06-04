import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page" role="region" aria-label="About Page">
      <h1>About Konverter</h1>
      
      <section className="about-section">
        <h2>What is Konverter?</h2>
        <p>
          Konverter is a powerful web-based toolkit designed to simplify data conversion and code optimization.
          Whether you're a developer, data analyst, or just someone who needs to work with different data formats
          or optimize your code, Konverter provides the tools you need in one convenient place. Best of all, it's completely free!
        </p>
      </section>

      <section className="features-section">
        <h2>Key Features</h2>
        <div className="feature-categories">
          <div className="feature-category">
            <h3>Data Conversion</h3>
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
            </ul>
          </div>

          <div className="feature-category">
            <h3>Code Minification</h3>
            <ul>
              <li>
                <strong>Multi-format Support:</strong> Minify HTML, CSS, and JavaScript code
              </li>
              <li>
                <strong>Real-time Stats:</strong> See size reduction and optimization metrics
              </li>
              <li>
                <strong>Easy Export:</strong> Copy minified code to clipboard with one click
              </li>
            </ul>
          </div>

          <div className="feature-category">
            <h3>General Features</h3>
            <ul>
              <li>
                <strong>Accessibility:</strong> Built with accessibility in mind, supporting screen readers and keyboard navigation
              </li>
              <li>
                <strong>Theme Support:</strong> Choose between light and dark themes for comfortable viewing
              </li>
              <li>
                <strong>Browser-based:</strong> All processing happens in your browser, ensuring privacy
              </li>
              <li>
                <strong>Free Forever:</strong> No hidden costs or premium features - everything is free!
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="usage-section">
        <h2>How to Use</h2>
        <div className="usage-categories">
          <div className="usage-category">
            <h3>Data Converter</h3>
            <ol>
              <li>Navigate to the Converter page</li>
              <li>Choose your input method (paste or upload)</li>
              <li>Select the appropriate delimiter for CSV files</li>
              <li>Click the conversion button</li>
              <li>Download or copy your converted output</li>
            </ol>
          </div>

          <div className="usage-category">
            <h3>Code Minifier</h3>
            <ol>
              <li>Go to the Minifier page</li>
              <li>Select your code type (HTML, CSS, or JavaScript)</li>
              <li>Paste your code in the input area</li>
              <li>Click the minify button</li>
              <li>Copy the optimized code to your clipboard</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="developer-section">
        <h2>About the Developer</h2>
        <div className="developer-info">
          <p>
            Konverter was created by <strong>Inioluwa-dev</strong>, a passionate developer dedicated to making
            useful tools for the developer community. This project was built with the goal of providing
            a simple, efficient, and free solution for common development tasks.
          </p>
          <p>
            Whether you're a seasoned developer or just starting out, Konverter is designed to help you
            streamline your workflow and make your development process more efficient. We believe in
            creating tools that are accessible to everyone, which is why Konverter is and will always
            remain completely free to use.
          </p>
        </div>
      </section>

      <div className="navigation-buttons">
        <Link to="/" className="secondary-button left" role="button" aria-label="Back to Home">
          Back to Home
        </Link>
        <Link to="/converter" className="primary-button center" role="button" aria-label="Try Converter">
          Try Converter
        </Link>
        <Link to="/minifier" className="primary-button right" role="button" aria-label="Try Minifier">
          Try Minifier
        </Link>
      </div>
    </div>
  );
};

export default About; 