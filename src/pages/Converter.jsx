import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import '../styles/converter.css';

const Converter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [conversionType, setConversionType] = useState('csv-to-json');
  const [copySuccess, setCopySuccess] = useState(false);
  const { theme } = useTheme();

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleConversionTypeChange = (e) => {
    setConversionType(e.target.value);
  };

  const handleConvert = () => {
    try {
      if (conversionType === 'csv-to-json') {
        const lines = input.split('\n');
        const headers = lines[0].split(',');
        const result = lines.slice(1).map(line => {
          const values = line.split(',');
          return headers.reduce((obj, header, index) => {
            obj[header.trim()] = values[index]?.trim() || '';
            return obj;
          }, {});
        });
        setOutput(JSON.stringify(result, null, 2));
      } else {
        const jsonData = JSON.parse(input);
        const headers = Object.keys(jsonData[0]);
        const csvRows = [
          headers.join(','),
          ...jsonData.map(row => headers.map(header => row[header]).join(','))
        ];
        setOutput(csvRows.join('\n'));
      }
    } catch (error) {
      setOutput('Error: Invalid input format');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={`converter-container ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="converter-header">
        <h1>Data Converter</h1>
        <p>Convert between CSV and JSON formats easily</p>
      </div>

      <div className="converter-form">
        <div className="form-group">
          <label htmlFor="conversionType">Conversion Type</label>
          <select
            id="conversionType"
            value={conversionType}
            onChange={handleConversionTypeChange}
            className="form-select"
          >
            <option value="csv-to-json">CSV to JSON</option>
            <option value="json-to-csv">JSON to CSV</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="input">Input</label>
          <textarea
            id="input"
            value={input}
            onChange={handleInputChange}
            placeholder={conversionType === 'csv-to-json' ? 
              'Enter CSV data (first line should be headers)' : 
              'Enter JSON array of objects'}
            className="form-control"
          />
        </div>

        <button onClick={handleConvert} className="convert-button">
          <i className="bi bi-arrow-left-right"></i>
          Convert
        </button>

        {output && (
          <div className="result-section active">
            <div className="result-header">
              <h2>Result</h2>
              <button onClick={handleCopy} className="copy-button">
                <i className="bi bi-clipboard"></i>
                {copySuccess ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="result-content">{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Converter; 