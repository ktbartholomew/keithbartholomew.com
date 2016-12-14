var Terminal = require('xterm');

var term = new Terminal({
  cursorBlink: true,
  visualBell: true
});

module.exports = term;
