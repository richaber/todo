import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import useLocalStorageState from 'use-local-storage-state'

/*
 * Note: ALL_CAPS constant names have no special meaning in JavaScript; they’re a
 * convention that tells other developers "this data will never change after being
 * defined here”.
 */
// const DATA = [];

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
