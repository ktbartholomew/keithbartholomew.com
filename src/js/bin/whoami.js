var Executable = require('../lib/files/executable');

module.exports = new Executable({
  name: 'whoami',
  main: function() {
    var output = 'website\r\n';
    this.stdout.write(output);
    this.exit(0);
  }
});
