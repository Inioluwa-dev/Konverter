/**
 * Delimiter Selector Component
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