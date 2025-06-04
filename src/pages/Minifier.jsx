import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import '../styles/Minifier.css';
import { useTheme } from '../context/ThemeContext';

// Import browser-compatible versions of the minifiers
import * as csso from 'csso';
import * as Terser from 'terser';

// Simple HTML minifier function
const minifyHTML = (html) => {
    return html
        // Remove comments
        .replace(/<!--[\s\S]*?-->/g, '')
        // Remove whitespace between tags
        .replace(/>\s+</g, '><')
        // Remove whitespace at the start and end
        .trim()
        // Remove multiple spaces
        .replace(/\s+/g, ' ')
        // Remove spaces before and after tags
        .replace(/\s*<\s*/g, '<')
        .replace(/\s*>\s*/g, '>')
        // Remove spaces before and after attributes
        .replace(/\s*=\s*/g, '=')
        // Remove spaces between attributes
        .replace(/\s+/g, ' ');
};

const Minifier = () => {
    const [code, setCode] = useState('');
    const [minifiedCode, setMinifiedCode] = useState('');
    const [codeType, setCodeType] = useState('html');
    const [error, setError] = useState('');
    const [stats, setStats] = useState(null);
    const [copySuccess, setCopySuccess] = useState(false);
    const { theme } = useTheme();

    const minifyCode = async () => {
        try {
            setError('');
            setStats(null);
            let result;
            let originalSize = new Blob([code]).size;
            let minifiedSize;

            switch (codeType) {
                case 'css':
                    try {
                        result = csso.minify(code);
                        setMinifiedCode(result.css);
                        minifiedSize = new Blob([result.css]).size;
                    } catch (err) {
                        throw new Error('Invalid CSS: ' + err.message);
                    }
                    break;

                case 'js':
                    result = await Terser.minify(code);
                    if (result.error) {
                        throw new Error(result.error.message);
                    }
                    setMinifiedCode(result.code);
                    minifiedSize = new Blob([result.code]).size;
                    break;

                case 'html':
                    try {
                        result = minifyHTML(code);
                        setMinifiedCode(result);
                        minifiedSize = new Blob([result]).size;
                    } catch (err) {
                        throw new Error('Invalid HTML: ' + err.message);
                    }
                    break;

                default:
                    throw new Error('Invalid code type');
            }

            const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);
            setStats({
                originalSize: formatSize(originalSize),
                minifiedSize: formatSize(minifiedSize),
                savings: `${savings}%`
            });
        } catch (err) {
            setError(err.message);
            setMinifiedCode('');
        }
    };

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(minifiedCode);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            setError('Failed to copy to clipboard');
        }
    };

    const downloadMinifiedCode = () => {
        const blob = new Blob([minifiedCode], { type: getMimeType(codeType) });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `minified.${getFileExtension(codeType)}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const getMimeType = (type) => {
        switch (type) {
            case 'html': return 'text/html';
            case 'css': return 'text/css';
            case 'js': return 'application/javascript';
            default: return 'text/plain';
        }
    };

    const getFileExtension = (type) => {
        switch (type) {
            case 'html': return 'html';
            case 'css': return 'css';
            case 'js': return 'js';
            default: return 'txt';
        }
    };

    return (
        <div className={`minifier-container ${theme === 'dark' ? 'dark' : ''}`}>
            <div className="minifier-header">
                <h1>Code Minifier</h1>
                <p>Minify your HTML, CSS, or JavaScript code to reduce file size and improve loading times.</p>
            </div>

            <div className="minifier-form">
                <Form.Group className="code-type-selector">
                    <Form.Select
                        value={codeType}
                        onChange={(e) => setCodeType(e.target.value)}
                    >
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="js">JavaScript</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        as="textarea"
                        className="code-input"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder={`Enter your ${codeType.toUpperCase()} code here...`}
                    />
                </Form.Group>

                <Button
                    className="minify-button"
                    onClick={minifyCode}
                    disabled={!code.trim()}
                >
                    Minify Code
                </Button>

                {error && (
                    <Alert variant="danger" className="mt-3">
                        {error}
                    </Alert>
                )}

                {minifiedCode && (
                    <div className="result-container">
                        <div className="result-header">
                            <h3>Minified Result</h3>
                            <div className="result-actions">
                                <Button
                                    className="action-button copy-button"
                                    onClick={copyToClipboard}
                                    variant="outline-primary"
                                >
                                    {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
                                </Button>
                                <Button
                                    className="action-button download-button"
                                    onClick={downloadMinifiedCode}
                                    variant="outline-success"
                                >
                                    Download
                                </Button>
                            </div>
                        </div>
                        <pre className="minified-output">{minifiedCode}</pre>
                        {stats && (
                            <div className="stats">
                                <p>Original Size: {stats.originalSize}</p>
                                <p>Minified Size: {stats.minifiedSize}</p>
                                <p>Size Reduction: {stats.savings}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Minifier; 