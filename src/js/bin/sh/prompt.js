var term = require('../../lib/term');
var os = require('../../lib/os');
var chalk = require('chalk');
var tabComplete = require('./tab-complete');

module.exports = {
  prompt: function (callback) {
    var input = {
      contents: '',
      cursor: 0
    };

    var cursor = {
      left: function () {
        input.cursor = Math.max(0, input.cursor - 1);
        drawPrompt();
      },
      right: function () {
        input.cursor = Math.min(input.contents.length, input.cursor + 1);
        drawPrompt();
      },
      home: function () {
        input.cursor = 0;
        drawPrompt();
      },
      end: function () {
        input.cursor = input.contents.length;
        drawPrompt();
      }
    };

    var drawPrompt = function () {
      term.x = 0;
      term.eraseLine(term.y);
      term.write(PS1() + input.contents);
      term.x = chalk.stripColor(PS1()).length + input.cursor;

      term.refresh(term.y + term.ybase, term.y + term.ybase + 1, false);
    };

    var insertData = function (data) {
      var contents = input.contents.split('');
      var addition = data.split('');

      Array.prototype.splice.apply(contents, [input.cursor, 0].concat(addition));

      input.contents = contents.join('');
      input.cursor += addition.length;
      drawPrompt();
    };

    var backspace = function () {
      var contents = input.contents.split('');
      contents.splice(input.cursor - 1, 1);

      input.contents = contents.join('');
      input.cursor = Math.max(0, input.cursor - 1);
      drawPrompt();
    };

    var PS1 = function () {
      var cwd = os.getcwd();
      var homeDir = new RegExp('^' + os.getenv().HOME);

      cwd = cwd.replace(homeDir, '~');

      return chalk.blue(cwd + ' $ ');
    };

    var dataHandler = function (data) {
      var bytes = [];
      for (var i = 0; i < data.length; i++) {
        bytes.push(data.codePointAt(i));
      }

      if (bytes[0] === 27 && bytes[1] === 91) {
        switch (bytes[2]) {
          case 67:
            cursor.right();
            break;
          case 68:
            cursor.left();
            break;
          case 70:
            cursor.end();
            break;
          case 72:
            cursor.home();
            break;
        }
      }

      if (bytes[0] < 32) {
        switch (bytes[0]) {
          case 1:
            cursor.home();
            break;
          case 2:
            cursor.left();
            break;
          case 5:
            cursor.end();
            break;
          case 6:
            cursor.right();
            break;
          case 7:
            term.bell();
            break;
          case 9:
            tabComplete(input, function (err, result) {
              if (err) {
                throw err;
              }

              insertData(result);
            });
            break;
          case 13:
            endPrompt();
            break;
        }

        return;
      }

      if (bytes[0] === 127) {
        return backspace();
      }

      insertData(data);
    };

    var endPrompt = function () {
      term.writeln('');
      term.off('data', dataHandler);
      callback(input.contents);
    };

    term.on('data', dataHandler);
    drawPrompt();
  }
};
