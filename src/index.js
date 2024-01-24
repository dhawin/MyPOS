import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
