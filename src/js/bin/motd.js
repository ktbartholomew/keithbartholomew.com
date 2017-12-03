var Executable = require('../lib/files/executable');
var os = require('../lib/os');

module.exports = new Executable({
  name: 'motd',
  main: function () {
    if (os.getcwd() === os.getenv().HOME) {
      os.exec(['/bin/cat', '/etc/motd']);
    }
    this.exit(0);
  }
});
