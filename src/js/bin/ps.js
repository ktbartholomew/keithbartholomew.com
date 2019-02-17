var Executable = require('../lib/files/executable');

module.exports = new Executable({
  name: 'ps',
  main: function() {
    var output = '';

    output += 'PID      USER     TIME   COMMAND\r\n';
    output += '  1   website     0:00   sh\r\n';
    output += '  2   website     0:00   ps\r\n';

    this.stdout.write(output);
    this.exit(0);
  }
});
