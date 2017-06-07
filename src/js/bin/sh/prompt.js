var term = require('../../lib/term');
var os = require('../../lib/os');
var io = require('../../lib/io');
var chalk = require('chalk');
var tabComplete = require('./tab-complete');
var history = require('./history');

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
      io.stdout.write(PS1() + input.contents);
      term.x = chalk.stripColor(PS1()).length + input.cursor;

      term.refresh(term.y + term.ybase, term.y + term.ybase + 1, false);
    };

    var insertData = function (data) {
      var contents = input.contents.split('');
      var addition = data.split('');

      Array.prototype.splice.apply(contents, [input.cursor, 0].concat(addition));

      setInput(contents.join(''), input.cursor + addition.length);
      drawPrompt();
    };

    var setInput = function (data, cursor, updateScratchpad) {
      if (typeof cursor !== 'number') {
        cursor = data.length;
      } else {
        cursor = Math.floor(cursor);
      }

      updateScratchpad = (typeof updateScratchpad !== 'boolean') ? true : false;

      if (updateScratchpad) {
        history.SetScratchpad(data);
      }
      
      input.contents = data;
      input.cursor = cursor;

      drawPrompt();
    }

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
          case 65:
            history.Previous((err, data) => {
              setInput(data, null, false);
            });
            break;
          case 66:
            history.Next((err, data) => {
              setInput(data, null, false);
            });
            break;
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

              if (result.multiple) {
                io.stdout.write('\r\n' + result.string + '\r\n');
                drawPrompt();
              } else {
                insertData(result.stringDelta);
              }
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
      term.off('data', dataHandler);
      
      history.Append(input.contents);
      io.stdout.write('\r\n');
      callback(input.contents);
    };

    term.on('data', dataHandler);
    drawPrompt();
  }
};
