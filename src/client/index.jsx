import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import appState from './stores';

ReactDOM.render(<App state={appState}/>, document.getElementById("root"));
