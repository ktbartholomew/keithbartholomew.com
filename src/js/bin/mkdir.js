var Directory = require('../lib/files/directory');
var Executable = require('../lib/files/executable');
var os = require('../lib/os');
var fs = require('../lib/fs');
var path = require('path-browserify');

module.exports = new Executable({
  main: function () {
    if (!arguments[1]) {
      return;
    }

    fs.write(path.resolve(os.getcwd(), arguments[1]), new Directory());
    this.exit(0);
  }
});
