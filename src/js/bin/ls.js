var Executable = require('../lib/files/executable');
var chalk = require('chalk');
var path = require('path-browserify');
var fs = require('../lib/fs');
var os = require('../lib/os');

module.exports = new Executable({
  name: 'ls',
  main: function() {
    var target = arguments[1]
      ? path.resolve(os.getcwd(), arguments[1])
      : os.getcwd();
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
        case 'hyperlink':
          children[i] = chalk.cyan(children[i]);
          break;
      }
    }

    this.stdout.write(children.join('\t') + '\r\n');
    this.exit(0);
  }
});
