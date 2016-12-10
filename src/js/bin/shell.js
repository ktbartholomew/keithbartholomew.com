var chalk = require('chalk');
var path = require('path-browserify');
var Executable = require('../lib/files/executable');

module.exports = new Executable({
  main: function () {
    var term = require('../lib/term');
    var os = require('../lib/os');
    var fs = require('../lib/fs');

    var writePrompt = function () {
      if (term.x !== 0) {
        term.x = 0;
        term.y += 1;
      }
      term.write(PS1());
      term.refresh(term.y + term.ybase - 1, term.y + term.ybase);
      term.x = PS1().length;
    };

    var PS1 = function () {
      var cwd = os.getcwd();
      var homeDir = new RegExp('^' + os.getenv().HOME);

      cwd = cwd.replace(homeDir, '~');

      return cwd + ' $ ';
    };

    var evaluateInput = function (input, callback) {
      callback = callback || writePrompt;
      term.writeln('');

      if (input === '') {
        return callback();
      }

      input = input.split(' ');

      try {
        input[0] = resolveExecutable(input[0]);
        os.exec.apply(undefined, input);
      } catch (e) {
        term.writeln(chalk.red(e));
      }

      return callback();
    };

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

    var tabComplete = function (input) {
      //  shh
    };

    var readLine = function () {
      var line = term.lines[term.y + term.ybase];
      var string = '';

      line.forEach(function (col) {
        string = string.concat(col[1]);
      });

      if (string.indexOf(PS1()) === 0) {
        string = string.substring(PS1().length);
      }

      string = string.trim();

      return string;
    };

    writePrompt();

    term.on('data', (data) => {
      var bytes = [];
      for (var i = 0; i < data.length; i++) {
        bytes.push(data.codePointAt(i).toString(10));
      }
      console.log(bytes);

      // An escape sequence!
      if (data.codePointAt(0) === 27) {
        // A cursor movement!
        if (data.codePointAt(1) === 91) {
          switch (data.codePointAt(2)) {
            // up
            case 65:
              break;
            // down
            case 66:
              break;
            // right
            case 67:
              if (term.x < term.cols && term.lines[term.y][term.x][1] !== ' ') {
                term.x += 1;
                term.write('');
              }
              break;
            // left
            case 68:
              if (term.x > PS1().length) {
                term.x -= 1;
                term.write('');
              }
              break;
          }
        }
      }

      // A control sequence!
      if (data.codePointAt(0) < 32) {
        switch (data.codePointAt(0)) {
          // [tab]
          case 9:
            tabComplete(readLine());
            break;
          // [enter]
          case 13:
            evaluateInput(readLine());
            break;
          default:
        }

        return;
      }

      if (data.codePointAt(0) === 127) {
        // backspace
        if (term.x <= PS1().length) {
          return;
        }
        term.x -= 1;
        var x = term.x;
        var y = term.y + term.ybase;
        var blank = [term.eraseAttr(), ' ', 1];

        term.lines[y].splice(x, 1);
        term.lines[y].push(blank);

        term.refresh(y, y, true);

        return;
      }

      term.write(data);
    });
  }
});
