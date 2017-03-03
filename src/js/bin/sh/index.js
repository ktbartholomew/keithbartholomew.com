var Executable = require('../../lib/files/executable');

module.exports = new Executable({
  name: 'sh',
  main: function () {
    var readline = require('./readline');

    readline();
  }
});
