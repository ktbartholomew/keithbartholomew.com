var term = require('../../lib/term');
var os = require('../../lib/os');
var fs = require('../../lib/fs');
var chalk = require('chalk');
var path = require('path-browserify');
var prompt = require('./prompt');

module.exports = function () {
  var resolveExecutable = function (name) {
    var paths = os.getenv().PATH.split(':');

    for (var i = 0; i < paths.length; i++) {
      var fullPath = path.resolve(paths[i], name);
      if (fs.stat(fullPath).type === 'executable') {
        return fullPath;
      }
    }

    throw new Error(name + ': command not found');
  };

  var handleInput = function (input) {
    if (input === '') {
      return prompt.prompt(handleInput);
    }

    input = input.split(' ');

    try {
      input[0] = resolveExecutable(input[0]);
      os.exec.apply(undefined, input);
    } catch (e) {
      term.writeln(chalk.red(e));
    }
    prompt.prompt(handleInput);
  };

  prompt.prompt(handleInput);
};
