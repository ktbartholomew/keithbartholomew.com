var chalk = require('chalk');
var init = require('./lib/init');
var React = require('react');
var ReactDOM = require('react-dom');
var Terminal = require('./components/terminal');
var Overlays = require('./components/overlays');

chalk.enabled = true;

ReactDOM.render(<Terminal />, document.querySelector('#terminal'));
ReactDOM.render(<Overlays window={null} />, document.querySelector('#overlays'));

init();
