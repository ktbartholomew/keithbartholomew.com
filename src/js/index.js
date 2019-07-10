var chalk = require('chalk');
var init = require('./lib/init');

import React from 'react';
import ReactDOM from 'react-dom';
import Terminal from './components/terminal';
var Overlays = require('./components/overlays');

chalk.enabled = true;

ReactDOM.render(<Terminal />, document.querySelector('#terminal'));
ReactDOM.render(<Overlays />, document.querySelector('#overlays'));

init();
