const fs = require('fs');
const path = require('path');

// Create public/css directory if it doesn't exist
const cssDir = path.join(__dirname, '../public/css');
if (!fs.existsSync(cssDir)) {
  fs.mkdirSync(cssDir, { recursive: true });
}

// Copy Bootstrap Icons CSS
const sourcePath = path.join(__dirname, '../node_modules/bootstrap-icons/font/bootstrap-icons.css');
const targetPath = path.join(cssDir, 'bootstrap-icons.css');

fs.copyFileSync(sourcePath, targetPath);
console.log('Bootstrap Icons CSS copied successfully!'); 