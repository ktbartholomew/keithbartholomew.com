var Executable = require('../lib/files/executable');

module.exports = new Executable({
  main: function() {
    window.location.reload();
  }
});
