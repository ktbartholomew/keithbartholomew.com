var Executable = require('../lib/files/executable');

module.exports = new Executable({
  main: function () {
    var term = require('../lib/term');
    var os = require('../lib/os');

    term.writeln(os.getcwd());
  }
});
