import React, { useState } from 'react';

// ConverterPanel: Handles CSV to JSON and JSON to CSV conversion
const ConverterPanel = ({ input, output, delimiter, onInputChange, onOutputChange, onDelimiterChange }) => {
  const [error, setError] = useState('');

  // Handle input changes and clear errors
  const handleInputChange = (e) => {
    onInputChange(e.target.value);
    setError('');
  };

  // Handle delimiter changes
  const handleDelimiterChange = (e) => {
    onDelimiterChange(e.target.value);
  };

  // Convert CSV to JSON
  const csvToJson = () => {
    try {
      if (!input.trim()) {
        setError('Error: Input is empty');
        return;
      }
      const lines = input.trim().split('\n');
      if (lines.length < 2) {
        setError('Error: CSV must have at least a header and one data row');
        return;
      }
      const headers = lines[0].split(delimiter);
      if (headers.length < 2) {
        setError('Error: CSV must have at least two columns');
        return;
      }
      const result = lines.slice(1).map(line => {
        const values = line.split(delimiter);
        if (values.length !== headers.length) {
          throw new Error('Error: Inconsistent number of columns');
        }
        return headers.reduce((obj, header, index) => {
          obj[header.trim()] = values[index] ? values[index].trim() : '';
          return obj;
        }, {});
      });
      onOutputChange(JSON.stringify(result, null, 2));
      setError('');
    } catch (error) {
      setError(error.message || 'Error: Invalid CSV format');
    }
  };

  // Convert JSON to CSV
  const jsonToCsv = () => {
    try {
      if (!input.trim()) {
        setError('Error: Input is empty');
        return;
      }
      const data = JSON.parse(input);
      if (!Array.isArray(data) || data.length === 0) {
        setError('Error: Input must be a non-empty array of objects');
        return;
      }
      const headers = Object.keys(data[0]);
      if (headers.length < 2) {
        setError('Error: JSON objects must have at least two keys');
        return;
      }
      const csvRows = [headers.join(delimiter)];
      data.forEach(item => {
        const row = headers.map(header => item[header] || '').join(delimiter);
        csvRows.push(row);
      });
      onOutputChange(csvRows.join('\n'));
      setError('');
    } catch (error) {
      setError(error.message || 'Error: Invalid JSON format');
    }
  };

  return (
    <div className="converter-panel" role="region" aria-label="Converter Panel">
      <h2>Converter Panel</h2>
      <div>
        <label htmlFor="delimiter">Delimiter: </label>
        <input
          id="delimiter"
          type="text"
          value={delimiter}
          onChange={handleDelimiterChange}
          maxLength="1"
          aria-label="CSV Delimiter"
        />
      </div>
      <div>
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Paste CSV or JSON here..."
          rows="10"
          style={{ width: '100%' }}
          aria-label="Input Data"
        />
      </div>
      <div>
        <button onClick={csvToJson} aria-label="Convert CSV to JSON">CSV to JSON</button>
        <button onClick={jsonToCsv} aria-label="Convert JSON to CSV">JSON to CSV</button>
      </div>
      {error && <div style={{ color: 'red' }} role="alert">{error}</div>}
      <div>
        <textarea
          value={output}
          readOnly
          placeholder="Output will appear here..."
          rows="10"
          style={{ width: '100%' }}
          aria-label="Output Data"
        />
      </div>
    </div>
  );
};

export default ConverterPanel; 