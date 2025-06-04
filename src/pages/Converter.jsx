import React, { useState } from 'react';
import Papa from 'papaparse';
import DelimiterSelector from '../components/DelimiterSelector';
import FileUploader from '../components/FileUploader';

const Converter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [conversionMode, setConversionMode] = useState('csvToJson'); // Track current conversion mode

  const handleFileUpload = (content) => {
    setInput(content);
    setError('');
    setSuccess('File uploaded successfully');
  };

  const csvToJson = () => {
    try {
      if (!input.trim()) {
        setError('Error: Input is empty');
        return;
      }

      Papa.parse(input, {
        delimiter: delimiter,
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            setError(`Error: ${results.errors[0].message}`);
            return;
          }
          setOutput(JSON.stringify(results.data, null, 2));
          setSuccess('CSV successfully converted to JSON');
          setError('');
          setConversionMode('csvToJson');
        }
      });
    } catch (error) {
      setError(error.message || 'Error: Invalid CSV format');
    }
  };

  const jsonToCsv = () => {
    try {
      if (!input.trim()) {
        setError('Error: Input is empty');
        return;
      }

      const jsonData = JSON.parse(input);
      if (!Array.isArray(jsonData) || jsonData.length === 0) {
        setError('Error: Input must be a non-empty array of objects');
        return;
      }

      const csv = Papa.unparse(jsonData, {
        delimiter: delimiter
      });
      
      setOutput(csv);
      setSuccess('JSON successfully converted to CSV');
      setError('');
      setConversionMode('jsonToCsv');
    } catch (error) {
      setError(error.message || 'Error: Invalid JSON format');
    }
  };

  const handleDownload = (format = 'txt') => {
    if (!output.trim()) {
      setError('Error: No output to download');
      return;
    }

    const blob = new Blob([output], { 
      type: format === 'txt' ? 'text/plain' : 
            conversionMode === 'csvToJson' ? 'application/json' : 'text/csv'
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

  return (
    <div className="converter-page">
      <h1 className="text-center">CSV to JSON Converter</h1>
      
      <div className="converter-section">
        <div className="input-section">
          <h2>Input</h2>
          <DelimiterSelector
            delimiter={delimiter}
            onDelimiterChange={setDelimiter}
          />
          <FileUploader onFileUpload={handleFileUpload} />
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your CSV or JSON here..."
            aria-label="Input Data"
          />
          <div className="button-group">
            <button onClick={csvToJson} className="primary-button">
              CSV to JSON
            </button>
            <button onClick={jsonToCsv} className="primary-button">
              JSON to CSV
            </button>
          </div>
        </div>

        <div className="output-section">
          <h2>Output</h2>
          <textarea
            value={output}
            readOnly
            placeholder="Converted output will appear here..."
            aria-label="Output Data"
          />
          <div className="button-group">
            <button onClick={() => handleDownload('txt')} className="primary-button">
              Download as TXT
            </button>
            <button 
              onClick={() => handleDownload(conversionMode === 'csvToJson' ? 'json' : 'csv')} 
              className="primary-button"
            >
              Download as {conversionMode === 'csvToJson' ? 'JSON' : 'CSV'}
            </button>
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default Converter; 