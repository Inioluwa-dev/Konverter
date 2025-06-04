# Konverter

A modern, responsive web application for converting between CSV and JSON formats. Built with React and featuring a sleek, user-friendly interface.

![Konverter Screenshot](screenshot.png)

## Features

- 🔄 Bidirectional conversion between CSV and JSON
- 📤 File upload support (drag & drop)
- 📋 Copy to clipboard functionality
- 💾 Download as TXT, JSON, or CSV
- 🌓 Light/Dark mode toggle
- 📱 Fully responsive design
- ♿ Accessibility features
- ⚡ Real-time conversion
- 🔍 Custom delimiter selection

## Tech Stack

- React
- Vite
- PapaParse (for CSV parsing)
- React Router
- CSS3 with CSS Variables
- Modern JavaScript (ES6+)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/konverter.git
cd konverter
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

1. Choose your conversion direction (CSV to JSON or JSON to CSV)
2. Either:
   - Paste your data directly into the input field
   - Drag and drop a file
   - Click to browse and select a file
3. Select your delimiter (for CSV)
4. View the converted output
5. Download or copy the result

## Building for Production

```bash
npm run build
# or
yarn build
```

The build files will be in the `dist` directory.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [PapaParse](https://www.papaparse.com/) for CSV parsing
- [React](https://reactjs.org/) for the UI framework
- [Vite](https://vitejs.dev/) for the build tool
