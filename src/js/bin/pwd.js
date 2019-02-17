var Executable = require('../lib/files/executable');
var os = require('../lib/os');

module.exports = new Executable({
  name: 'pwd',
  main: function() {
    this.stdout.write(os.getcwd() + '\n');

    this.exit(0);
  }
});
