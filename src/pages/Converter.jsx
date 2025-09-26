import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import SEO from '../components/SEO';
import '../styles/converter.css';

/**
 * CSV/JSON Converter Component
 * Copyright (c) 2025 Comibyte Team. All Rights Reserved.
 * 
 * PROPRIETARY AND CONFIDENTIAL
 * 
 * This software is the exclusive property of Comibyte Team
 * Unauthorized copying, modification, distribution, or use of this software,
 * via any medium, is strictly prohibited.
 * 
 * This software was developed with significant time and effort 
 * Any unauthorized use, reproduction, or distribution of this software
 * or its contents is strictly prohibited and may result in severe legal penalties.
 * 
 * For licensing inquiries, please contact: Misterhge@gmail.com
 */


const Converter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [conversionType, setConversionType] = useState('csv-to-json');
  const [copySuccess, setCopySuccess] = useState(false);
  const [showFullOutput, setShowFullOutput] = useState(false);
  const [errors, setErrors] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [delimiter, setDelimiter] = useState(',');
  const { theme } = useTheme();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CSV JSON Converter - Konverter",
    "description": "Convert between CSV and JSON formats easily with our professional data converter tool. Support for custom delimiters, file upload, and real-time conversion.",
    "url": "https://Kon-verter.web.app/converter",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "CSV to JSON conversion",
      "JSON to CSV conversion",
      "Custom delimiter support",
      "File upload functionality",
      "Real-time conversion",
      "Copy to clipboard",
      "Download converted files"
    ],
    "creator": {
      "@type": "Organization",
      "name": "Comibyte Team",
      "url": "https://Kon-verter.web.app"
    }
  };

  const MAX_VISIBLE_LINES = 20;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  // Validation functions
  const validateCSV = (csvData) => {
    const errors = [];
    const warnings = [];
    
    if (!csvData.trim()) {
      errors.push('CSV data cannot be empty');
      return { errors, warnings };
    }

    const lines = csvData.split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
      errors.push('CSV must have at least 2 lines (header + data)');
      return { errors, warnings };
    }

    const headers = lines[0].split(delimiter);
    const headerCount = headers.length;
    
    if (headerCount === 1 && lines[0].split(',').length > 1) {
      warnings.push('Consider using comma (,) as delimiter if your data contains commas');
    }

    // Check for consistent column count
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(delimiter);
      if (values.length !== headerCount) {
        errors.push(`Line ${i + 1} has ${values.length} columns, expected ${headerCount}`);
      }
    }

    // Check for empty headers
    const emptyHeaders = headers.filter(header => !header.trim());
    if (emptyHeaders.length > 0) {
      warnings.push('Some headers are empty. Consider using descriptive column names');
    }

    return { errors, warnings };
  };

  const validateJSON = (jsonData) => {
    const errors = [];
    const warnings = [];
    
    if (!jsonData.trim()) {
      errors.push('JSON data cannot be empty');
      return { errors, warnings };
    }

    try {
      const parsed = JSON.parse(jsonData);
      
      if (!Array.isArray(parsed)) {
        errors.push('JSON must be an array of objects');
        return { errors, warnings };
      }

      if (parsed.length === 0) {
        warnings.push('JSON array is empty');
        return { errors, warnings };
      }

      // Check if all objects have the same keys
      const firstObjectKeys = Object.keys(parsed[0]);
      for (let i = 1; i < parsed.length; i++) {
        const currentKeys = Object.keys(parsed[i]);
        const missingKeys = firstObjectKeys.filter(key => !currentKeys.includes(key));
        const extraKeys = currentKeys.filter(key => !firstObjectKeys.includes(key));
        
        if (missingKeys.length > 0) {
          warnings.push(`Object at index ${i} is missing keys: ${missingKeys.join(', ')}`);
        }
        if (extraKeys.length > 0) {
          warnings.push(`Object at index ${i} has extra keys: ${extraKeys.join(', ')}`);
        }
      }

      // Check for empty values
      const emptyValues = [];
      parsed.forEach((obj, index) => {
        Object.entries(obj).forEach(([key, value]) => {
          if (value === null || value === undefined || value === '') {
            emptyValues.push(`Object ${index + 1}, key "${key}"`);
          }
        });
      });
      
      if (emptyValues.length > 0) {
        warnings.push(`Found ${emptyValues.length} empty values in the data`);
      }

    } catch (error) {
      errors.push(`Invalid JSON format: ${error.message}`);
    }

    return { errors, warnings };
  };

  const validateFile = (file) => {
    const errors = [];
    const warnings = [];

    if (!file) {
      errors.push('No file selected');
      return { errors, warnings };
    }

    if (file.size > MAX_FILE_SIZE) {
      errors.push(`File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds maximum allowed size (5MB)`);
    }

    const expectedExtension = conversionType === 'csv-to-json' ? '.csv' : '.json';
    if (!file.name.toLowerCase().endsWith(expectedExtension)) {
      warnings.push(`File extension doesn't match expected format (${expectedExtension})`);
    }

    return { errors, warnings };
  };

  const clearErrors = () => {
    setErrors([]);
    setWarnings([]);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    clearErrors();
  };

  const handleConversionTypeChange = (e) => {
    setConversionType(e.target.value);
    clearErrors();
  };

  const handleDelimiterChange = (e) => {
    setDelimiter(e.target.value);
    clearErrors();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    clearErrors();
    
    if (file) {
      const fileValidation = validateFile(file);
      setErrors(fileValidation.errors);
      setWarnings(fileValidation.warnings);
      
      if (fileValidation.errors.length === 0) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setInput(event.target.result);
        };
        reader.onerror = () => {
          setErrors(['Failed to read file. Please try again.']);
        };
        reader.readAsText(file);
      }
    }
  };

  const handleConvert = () => {
    setIsConverting(true);
    clearErrors();
    
    try {
      if (conversionType === 'csv-to-json') {
        const csvValidation = validateCSV(input);
        setErrors(csvValidation.errors);
        setWarnings(csvValidation.warnings);
        
        if (csvValidation.errors.length > 0) {
          setIsConverting(false);
          return;
        }
        
        const lines = input.split('\n').filter(line => line.trim());
        const headers = lines[0].split(delimiter).map(h => h.trim());
        const result = lines.slice(1).map((line, index) => {
          const values = line.split(delimiter);
          return headers.reduce((obj, header, colIndex) => {
            obj[header] = values[colIndex]?.trim() || '';
            return obj;
          }, {});
        });
        
        setOutput(JSON.stringify(result, null, 2));
        setShowFullOutput(false);
      } else {
        const jsonValidation = validateJSON(input);
        setErrors(jsonValidation.errors);
        setWarnings(jsonValidation.warnings);
        
        if (jsonValidation.errors.length > 0) {
          setIsConverting(false);
          return;
        }
        
        const jsonData = JSON.parse(input);
        const headers = Object.keys(jsonData[0]);
        const csvRows = [
          headers.join(delimiter),
          ...jsonData.map(row => headers.map(header => {
            const value = row[header];
            // Handle values that contain the delimiter by wrapping in quotes
            if (typeof value === 'string' && value.includes(delimiter)) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value || '';
          }).join(delimiter))
        ];
        setOutput(csvRows.join('\n'));
        setShowFullOutput(false);
      }
    } catch (error) {
      setErrors([`Conversion failed: ${error.message}`]);
    } finally {
      setIsConverting(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleDownload = (format) => {
    if (!output) return;
    const blob = new Blob([output], { type: format === 'json' ? 'application/json' : 'text/plain' });
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
    <>
      <SEO
        title="CSV JSON Converter - Konverter"
        description="Convert between CSV and JSON formats easily with our professional data converter tool. Support for custom delimiters, file upload, and real-time conversion. Free to use."
        keywords="CSV to JSON, JSON to CSV, data converter, CSV converter, JSON converter, file converter, delimiter, data format conversion, comibyte, konverter"
        url="/converter"
        structuredData={structuredData}
      />
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
          
          {conversionType === 'csv-to-json' && (
            <div className="form-group">
              <label htmlFor="delimiter">CSV Delimiter</label>
              <select 
                id="delimiter" 
                value={delimiter}
                onChange={handleDelimiterChange}
                className="form-select"
              >
                <option value=",">Comma (,)</option>
                <option value=";">Semicolon (;)</option>
                <option value="\t">Tab</option>
                <option value="|">Pipe (|)</option>
                <option value=":">Colon (:)</option>
              </select>
            </div>
          )}
          
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
              <i className="bi bi-cloud-upload"></i>Choose File
            </label>
            <small className="file-info">Maximum file size: 5MB</small>
          </div>
          
          <div className="form-group">
            <label htmlFor="input">Input Data</label>
            <textarea 
              id="input" 
              value={input}
              onChange={handleInputChange}
              placeholder={conversionType === 'csv-to-json' ? 'Enter CSV data (first line should be headers)' : 'Enter JSON array of objects'}
              className={`form-control ${errors.length > 0 ? 'error' : ''}`}
              rows="8"
            />
            <small className="input-info">
              {conversionType === 'csv-to-json' 
                ? 'First line should contain column headers, each row on a new line' 
                : 'Enter a valid JSON array of objects'
              }
            </small>
          </div>
          
          {/* Error and Warning Display */}
          {errors.length > 0 && (
            <div className="error-container">
              <div className="error-header">
                <i className="bi bi-exclamation-triangle-fill"></i>
                <span>Errors Found ({errors.length})</span>
              </div>
              <ul className="error-list">
                {errors.map((error, index) => (
                  <li key={index} className="error-item">
                    <i className="bi bi-x-circle"></i>
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {warnings.length > 0 && (
            <div className="warning-container">
              <div className="warning-header">
                <i className="bi bi-exclamation-triangle"></i>
                <span>Warnings ({warnings.length})</span>
              </div>
              <ul className="warning-list">
                {warnings.map((warning, index) => (
                  <li key={index} className="warning-item">
                    <i className="bi bi-info-circle"></i>
                    {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <button 
            onClick={handleConvert} 
            className="convert-button"
            disabled={isConverting || errors.length > 0 || !input.trim()}
          >
            {isConverting ? (
              <>
                <i className="bi bi-arrow-clockwise spin"></i>Converting...
              </>
            ) : (
              <>
                <i className="bi bi-arrow-left-right"></i>Convert
              </>
            )}
          </button>
          
          {output && (
            <div className="result-section active">
              <div className="result-header">
                <h2>Result</h2>
                <div className="result-actions">
                  <button onClick={handleCopy} className="copy-button">
                    <i className="bi bi-clipboard"></i>{copySuccess ? 'Copied!' : 'Copy'}
                  </button>
                  <button 
                    onClick={() => handleDownload(conversionType === 'csv-to-json' ? 'json' : 'csv')} 
                    className="download-button"
                  >
                    <i className="bi bi-download"></i>Download as {conversionType === 'csv-to-json' ? 'JSON' : 'CSV'}
                  </button>
                  <button onClick={() => handleDownload('txt')} className="download-button">
                    <i className="bi bi-download"></i>Download as TXT
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
    </>
  );
};

export default Converter;