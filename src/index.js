import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import configStore from './hooksStore/reducer';

// init store
configStore();

ReactDOM.render(<App />, document.getElementById('root'));