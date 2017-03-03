var Executable = require('../lib/files/executable');
var os = require('../lib/os');
var fs = require('../lib/fs');
var path = require('path-browserify');

module.exports = new Executable({
  name: 'open',
  main: function () {
    if (!arguments[1]) {
      this.stderr.write('Usage: ' + this.name + ' [filename]\r\n');
      this.exit(1);
      return;
    }

    var filePath = path.resolve(os.getcwd(), arguments[1]);
    var stats = fs.stat(filePath);
    var async = false;
    var error = false;

    switch (stats.type) {
      case 'executable':
        this.stdout.write('open: ' + arguments[1] + ': is an executable\r\n');
        error = true;
        break;
      case 'directory':
        this.stdout.write('open: ' + arguments[1] + ': is a directory\r\n');
        error = true;
        break;
      case 'hyperlink':
        window.open(fs.read(filePath).href, '_blank');
        break;
      case 'file':
      default:
        async = true;
        os.exec(['/usr/local/bin/view', filePath], () => {
          this.exit(0);
        });
        break;
    }

    if (!async) {
      this.exit((error) ? 1 : 0);
    }
  }
});
