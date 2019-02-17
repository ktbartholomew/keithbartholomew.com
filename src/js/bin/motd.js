var Executable = require('../lib/files/executable');
var os = require('../lib/os');
var fs = require('../lib/fs');
var path = require('path-browserify');

module.exports = new Executable({
  name: 'motd',
  main: function() {
    if (os.getcwd() === os.getenv().HOME) {
      os.exec(['/bin/cat', '/etc/motd']);
      this.exit(0);
      return;
    }

    if (fs.stat(path.resolve(os.getcwd(), 'README.md')).type !== null) {
      os.exec(['/bin/cat', path.resolve(os.getcwd(), 'README.md')]);
      this.exit(0);
      return;
    }

    this.exit(1);
  }
});
