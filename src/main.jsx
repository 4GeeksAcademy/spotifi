import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './js/App'; // Ruta de tu componente App
import './index.css'; // Si tienes algún archivo de estilo global

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
