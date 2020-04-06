var path = require('path-browserify');
var Executable = require('../lib/files/executable');
var os = require('../lib/os');
var fs = require('../lib/fs');

module.exports = new Executable({
  name: 'cat',
  main: function () {
    if (!arguments[1]) {
      this.stderr.write('Usage: ' + this.name + ' [filename]\r\n');
      this.exit(1);
      return;
    }

    var filePath = path.resolve(os.getcwd(), arguments[1]);
    var file = fs.read(filePath);
    var fileType = fs.stat(filePath).type;
    var lines = [];

    switch (fileType) {
      case 'file':
      default:
        lines = file.contents.split('\n');
        break;
      case 'executable':
        lines = file.main.toString().split('\n');
        break;
    }

    lines.forEach(
      function (line) {
        this.stdout.write(line + '\r\n');
      }.bind(this)
    );

    this.exit(1);
  }
});
