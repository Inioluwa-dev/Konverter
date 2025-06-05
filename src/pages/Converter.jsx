import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import '../styles/converter.css';

const Converter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [conversionType, setConversionType] = useState('csv-to-json');
  const [copySuccess, setCopySuccess] = useState(false);
  const [showFullOutput, setShowFullOutput] = useState(false);
  const { theme } = useTheme();

  const MAX_VISIBLE_LINES = 20;

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleConversionTypeChange = (e) => {
    setConversionType(e.target.value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setInput(event.target.result);
      };
      reader.readAsText(file);
    }
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
      setShowFullOutput(false);
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

  const handleDownload = (format) => {
    if (!output) return;

    const blob = new Blob([output], { 
      type: format === 'json' ? 'application/json' : 'text/plain' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted_output.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getTruncatedOutput = () => {
    if (!output) return '';
    const lines = output.split('\n');
    if (lines.length <= MAX_VISIBLE_LINES) return output;
    
    const visibleLines = lines.slice(0, MAX_VISIBLE_LINES);
    return visibleLines.join('\n') + '\n...';
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
          <label htmlFor="fileUpload">Upload File</label>
          <input
            type="file"
            id="fileUpload"
            onChange={handleFileUpload}
            accept={conversionType === 'csv-to-json' ? '.csv' : '.json'}
            className="file-input"
          />
          <label htmlFor="fileUpload" className="file-upload-label">
            Choose File
          </label>
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
              <div className="result-actions">
                <button onClick={handleCopy} className="copy-button">
                  <i className="bi bi-clipboard"></i>
                  {copySuccess ? 'Copied!' : 'Copy'}
                </button>
                <button 
                  onClick={() => handleDownload(conversionType === 'csv-to-json' ? 'json' : 'csv')} 
                  className="download-button"
                >
                  <i className="bi bi-download"></i>
                  Download as {conversionType === 'csv-to-json' ? 'JSON' : 'CSV'}
                </button>
                <button 
                  onClick={() => handleDownload('txt')} 
                  className="download-button"
                >
                  <i className="bi bi-download"></i>
                  Download as TXT
                </button>
              </div>
            </div>
            <div className="result-content-wrapper">
              <pre className="result-content">
                {showFullOutput ? output : getTruncatedOutput()}
              </pre>
              {output.split('\n').length > MAX_VISIBLE_LINES && (
                <button 
                  onClick={() => setShowFullOutput(!showFullOutput)} 
                  className="view-full-button"
                >
                  {showFullOutput ? 'Show Less' : 'View Full Code'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Converter; 