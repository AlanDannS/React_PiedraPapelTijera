import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Tablero from './Tablero';

ReactDOM.render(
  <React.StrictMode>
  <h1>PIEDRA, PAPEL O TIJERA</h1>
    <Tablero/>
  </React.StrictMode>,
  document.getElementById('root')
);
