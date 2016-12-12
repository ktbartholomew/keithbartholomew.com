var Terminal = require('xterm');
var chalk = require('chalk');

var term = new Terminal({
  cursorBlink: true,
  debug: true,
  visualBell: true
});

term.open(document.getElementById('terminal'));

var resizeTerminal = function () {
  var cols = Math.floor(window.innerWidth / term.charMeasureElement.getBoundingClientRect().width) - 1;
  var rows = Math.floor(window.innerHeight / term.charMeasureElement.getBoundingClientRect().height);
  term.resize(cols, rows);
};

window.addEventListener('resize', resizeTerminal);

resizeTerminal();
term.focus();
chalk.enabled = true;

module.exports = term;
