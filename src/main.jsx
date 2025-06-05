/**
 * Application Entry Point
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

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import './styles/about.css'
import './styles/converter.css'
import './styles/home.css'
import './styles/minifier.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
