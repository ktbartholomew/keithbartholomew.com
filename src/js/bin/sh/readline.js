var term = require('../../lib/term');
var os = require('../../lib/os');
var fs = require('../../lib/fs');
var io = require('../../lib/io');
var chalk = require('chalk');
var path = require('path-browserify');
var prompt = require('./prompt');

module.exports = function () {
  var eatOutput = false;

  io.stdout.capture();
  io.stdout.on('data', function (data) {
    if (eatOutput) {
      return;
    }
    term.write(data);
  });

  io.stderr.capture();
  io.stderr.on('data', function (data) {
    if (eatOutput) {
      return;
    }
    term.write(data);
  });

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
    // debugger;
    if (input === '') {
      return prompt.prompt(handleInput);
    }

    input = input.split(' ');
    for (var i = input.length; i >= 0; i--) {
      if (input[i] === '') {
        input.splice(i, 1);
      }
    }

    var execCallback = function (e, code) {
      return prompt.prompt(handleInput);
    };

    try {
      input[0] = resolveExecutable(input[0]);
      os.exec(input, execCallback);
    } catch (e) {
      console.log(e);
      io.stderr.write(chalk.red(e) + '\n');
      execCallback(null, 1);
    }
  };

  prompt.prompt(handleInput);
};
