var Executable = require('../lib/files/executable');
var chalk = require('chalk');
var path = require('path-browserify');

module.exports = new Executable({
  main: function () {
    var term = require('../lib/term');
    var fs = require('../lib/fs');
    var os = require('../lib/os');

    var target = (arguments[1]) ? path.resolve(os.getcwd(), arguments[1]) : os.getcwd();
    var children = fs.scan(target);

    for (var i = 0; i < children.length; i++) {
      var type = fs.stat(children[i]).type;

      children[i] = path.basename(children[i]);

      switch (type) {
        case 'directory':
          children[i] = chalk.blue(children[i]);
          break;
        case 'executable':
          children[i] = chalk.red(children[i]);
          break;
      }
    }

    term.writeln(children.join('\t'));
  }
});
