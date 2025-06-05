import React from 'react';

// DelimiterSelector: Allows users to choose the CSV delimiter
const DelimiterSelector = ({ delimiter, onDelimiterChange }) => {
  return (
    <div className="delimiter-selector">
      <label htmlFor="delimiter">Select Delimiter:</label>
      <select
        id="delimiter"
        value={delimiter}
        onChange={(e) => onDelimiterChange(e.target.value)}
        className="form-select"
      >
        <option value=",">Comma (,)</option>
        <option value=";">Semicolon (;)</option>
        <option value="\t">Tab</option>
        <option value="|">Pipe (|)</option>
      </select>
    </div>
  );
};

export default DelimiterSelector; 