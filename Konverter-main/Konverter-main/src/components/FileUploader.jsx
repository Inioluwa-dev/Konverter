import React, { useState } from 'react';

// FileUploader: Handles file uploads for CSV and JSON files
const FileUploader = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onFileUpload(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        onFileUpload(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div 
      className={`file-uploader ${dragActive ? 'drag-active' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        onChange={handleFileChange}
        accept=".csv,.json"
        id="file-upload"
        className="file-input"
        aria-label="Upload file"
      />
      <label htmlFor="file-upload" className="file-label">
        <span>Drag and drop a file here or click to browse</span>
        <span className="file-types">Supported formats: CSV, JSON</span>
      </label>
    </div>
  );
};

export default FileUploader; 