var term = require('./term');
var bootlog = require('raw!../var/bootlog');

bootlog = bootlog.split('\n');

module.exports = function(callback) {
  callback = callback || function() {};

  if (window.location.pathname !== '/') {
    return callback();
  }

  var writeLogLine = function() {
    var line = bootlog.shift();

    if (typeof line === 'undefined') {
      term.clear();
      return callback();
    }

    term.writeln(line);
    window.requestAnimationFrame(writeLogLine);
  };

  writeLogLine();
};
