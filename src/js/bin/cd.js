var Executable = require('../lib/files/executable');
var path = require('path-browserify');
var chalk = require('chalk');

module.exports = new Executable({
  main: function () {
    var term = require('../lib/term');
    var os = require('../lib/os');

    var doChdir = function () {};
    var newDir = arguments[1];

    if (!newDir) {
      doChdir = function () {
        os.chdir(os.getenv().HOME);
      };
    }

    if (newDir) {
      doChdir = function () {
        os.chdir(path.resolve(os.getcwd(), newDir));
      };
    }

    try {
      doChdir();
    } catch (e) {
      term.writeln(chalk.red(e));
    }
  }
});
