var Executable = require('../lib/files/executable');
var term = require('../lib/term');

module.exports = new Executable({
  main: function () {
    term.writeln('    Welcome to KeithOS!    ');
    term.writeln('===========================');
  }
});
