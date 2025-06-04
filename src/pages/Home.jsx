import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-page" role="region" aria-label="Home Page">
      <h1>Welcome to Konverter</h1>
      <p>Your all-in-one free tool for data conversion and code optimization</p>
      
      <div className="features">
        <h2>Features</h2>
        <div className="feature-grid">
          <div className="feature-card" role="article">
            <h3>Data Conversion</h3>
            <ul>
              <li>Convert CSV to JSON and vice versa</li>
              <li>Support for custom delimiters</li>
              <li>File upload and download capabilities</li>
            </ul>
            <Link 
              to="/converter" 
              className="feature-link"
              role="button"
              aria-label="Try the Data Converter"
            >
              Try Converter
            </Link>
          </div>

          <div className="feature-card" role="article">
            <h3>Code Minification</h3>
            <ul>
              <li>Minify HTML, CSS, and JavaScript</li>
              <li>Real-time size reduction stats</li>
              <li>Copy to clipboard functionality</li>
            </ul>
            <Link 
              to="/minifier" 
              className="feature-link"
              role="button"
              aria-label="Try the Code Minifier"
            >
              Try Minifier
            </Link>
          </div>
        </div>
      </div>

      <div className="common-features">
        <h3>Common Features</h3>
        <ul>
          <li>Light and dark theme support</li>
          <li>Accessible interface</li>
          <li>Modern, responsive design</li>
          <li>Browser-based processing</li>
          <li>Completely free to use</li>
        </ul>
      </div>

      <div className="cta-buttons">
        <Link 
          to="/converter" 
          className="primary-button left" 
          role="button" 
          aria-label="Start Converting Data"
        >
          Start Converting
        </Link>
        <Link 
          to="/minifier" 
          className="primary-button center" 
          role="button" 
          aria-label="Start Minifying Code"
        >
          Minify Code
        </Link>
        <Link 
          to="/about" 
          className="secondary-button right" 
          role="button" 
          aria-label="Learn More About Konverter"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default Home; 