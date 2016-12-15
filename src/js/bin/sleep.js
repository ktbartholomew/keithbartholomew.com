var Executable = require('../lib/files/executable');

module.exports = new Executable({
  main: function () {
    var sleepTime = parseInt(arguments[1]) || 0;

    setTimeout(function () {
      this.exit(0);
    }.bind(this), sleepTime * 1000);
  }
});
