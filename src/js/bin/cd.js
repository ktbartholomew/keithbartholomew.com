var Executable = require('../lib/files/executable');
var path = require('path-browserify');
var chalk = require('chalk');

module.exports = new Executable({
  name: 'cd',
  main: function () {
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
      this.exit(0);
    } catch (e) {
      this.stderr.write(chalk.red(e) + '\r\n');
      this.exit(1);
    }
  }
});
