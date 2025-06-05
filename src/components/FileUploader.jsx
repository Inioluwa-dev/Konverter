/**
 * File Uploader Component
 * Copyright (c) 2025 Comibyte Team. All Rights Reserved.
 * 
 * PROPRIETARY AND CONFIDENTIAL
 * 
 * This software is the exclusive property of Comibyte Team.
 * Unauthorized copying, modification, distribution, or use of this software,
 * via any medium, is strictly prohibited.
 * 
 * This software was developed with significant time and effort.
 * Any unauthorized use, reproduction, or distribution of this software
 * or its contents is strictly prohibited and may result in severe legal penalties.
 * 
 * For licensing inquiries, please contact: Misterhge@gmail.com
 */


import React from 'react';const FileUploader=({onFileUpload})=>{const handleFileChange=(e)=>{const file=e.target.files[0];if(file){const reader=new FileReader();reader.onload=(event)=>{onFileUpload(event.target.result);};reader.readAsText(file);}};return(<div className="file-uploader"><label htmlFor="file-upload" className="file-upload-label">Upload File</label><input type="file" id="file-upload" onChange={handleFileChange}accept=".csv,.txt,.json" className="file-input"/></div>);};export default FileUploader;