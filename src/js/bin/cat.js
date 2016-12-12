var Executable = require('../lib/files/executable');
var path = require('path-browserify');

module.exports = new Executable({
  main: function () {
    var term = require('../lib/term');
    var os = require('../lib/os');
    var fs = require('../lib/fs');

    var filePath = path.resolve(os.getcwd(), arguments[1]);
    var file = fs.read(filePath);
    var fileType = fs.stat(filePath).type;
    var lines = [];

    switch (fileType) {
      case 'file':
        lines = file.contents.split('\n');
        break;
      case 'executable':
        lines = file.main.toString().split('\n');
        break;
    }

    lines.forEach(function (line) {
      term.writeln(line);
    });
  }
});
