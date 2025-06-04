import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page" role="region" aria-label="Home Page">
      <h1>Welcome to Konverter</h1>
      <p>Your powerful CSV to JSON and JSON to CSV conversion tool</p>
      
      <div className="features">
        <h2>Features</h2>
        <ul>
          <li>Convert CSV to JSON and vice versa</li>
          <li>Support for custom delimiters</li>
          <li>File upload and download capabilities</li>
          <li>Light and dark theme support</li>
          <li>Accessible interface</li>
        </ul>
      </div>

      <div className="cta-buttons">
        <Link to="/converter" className="primary-button left" role="button" aria-label="Go to Converter">
          Start Converting
        </Link>
        <Link to="/about" className="secondary-button right" role="button" aria-label="Learn More">
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default Home; 