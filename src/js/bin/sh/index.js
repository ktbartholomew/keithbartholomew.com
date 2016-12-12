var Executable = require('../../lib/files/executable');

module.exports = new Executable({
  main: function () {
    var readline = require('./readline');

    readline();
  }
});
