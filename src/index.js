import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <div style={{ 
    backgroundColor: '#080808',
    backgroundSize: 'cover',
    height: '100%',
    width:'100%',
  }}>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  </div>,
  document.getElementById('root')
);
