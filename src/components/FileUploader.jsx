import React from 'react';

// FileUploader: Handles file uploads for CSV and JSON files
const FileUploader = ({ onFileUpload }) => {
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

  return (
    <div className="file-uploader">
      <label htmlFor="file-upload" className="file-upload-label">
        Upload File
      </label>
      <input
        type="file"
        id="file-upload"
        onChange={handleFileChange}
        accept=".csv,.txt,.json"
        className="file-input"
      />
    </div>
  );
};

export default FileUploader; 