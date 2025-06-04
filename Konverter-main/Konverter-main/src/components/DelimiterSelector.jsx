import React from 'react';

// DelimiterSelector: Allows users to choose the CSV delimiter
const DelimiterSelector = ({ delimiter, onDelimiterChange }) => {
  return (
    <div className="delimiter-selector" role="region" aria-label="Delimiter Selector">
      <h2>Delimiter Selector</h2>
      <select value={delimiter} onChange={(e) => onDelimiterChange(e.target.value)} aria-label="Select CSV Delimiter">
        <option value=",">Comma (,)</option>
        <option value=";">Semicolon (;)</option>
        <option value="\t">Tab (\t)</option>
      </select>
    </div>
  );
};

export default DelimiterSelector; 