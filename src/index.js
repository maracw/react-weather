import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';

const el = document.getElementById("root");

const root = ReactDom.createRoot(el);

root.render(<App />);
