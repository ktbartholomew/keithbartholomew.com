var os = require('../../lib/os');
var fs = require('../../lib/fs');
var path = require('path-browserify');

var tabCompleteState = {
  treatNextAsDoubleTab: false
};

module.exports = function (input, callback) {
  var getStringToComplete = function () {
    var inputString = input.contents.trim();
    var characters = [];

    for (var i = input.cursor - 1; i >= 0; i--) {
      if (inputString[i] === ' ') {
        break;
      }

      characters.unshift(inputString[i]);
    }

    return characters.join('');
  };

  var isFirstWord = function () {
    var inputString = input.contents.trim();

    return inputString.indexOf(' ') === -1 || input.cursor - 1 < inputString.indexOf(' ');
  };

  var getCommandCompletion = function (stringToComplete) {
    var paths = os.getenv().PATH.split(':');
    var possibleCompletions = [];

    paths.forEach(function (_path_) {
      var files = fs.scan(_path_);
      files.forEach(function (file) {
        if (fs.stat(file).type !== 'executable') {
          return;
        }

        if (path.basename(file).indexOf(stringToComplete) === 0) {
          possibleCompletions.push(path.basename(file));
        }
      });
    });

    console.log(possibleCompletions);

    if (possibleCompletions.length === 1) {
      return possibleCompletions[0];
    }

    return '';
  };

  var getPathCompletion = function (stringToComplete) {
    var possibleCompletions = [];
    var resolvedPath = path.resolve(os.getcwd(), stringToComplete);
    var pathToScan = '';

    if (fs.stat(resolvedPath).type === 'directory') {
      pathToScan = resolvedPath;
    } else {
      pathToScan = path.dirname(resolvedPath);
    }

    var files = fs.scan(pathToScan);
    files.forEach(function (file) {
      if (file.indexOf(resolvedPath) === 0) {
        possibleCompletions.push(file);
      }
    });

    if (possibleCompletions.length === 1) {
      if (fs.stat(possibleCompletions[0]).type === 'directory') {
        return possibleCompletions[0] + '/';
      } else {
        return possibleCompletions[0];
      }
    }

    return '';
  };

  var getCompletionDelta = function (stringToComplete, completedString) {
    return completedString.replace(new RegExp('^' + stringToComplete), '');
  };

  var stringToComplete = getStringToComplete();
  var completedString = (isFirstWord()) ?
    getCommandCompletion(stringToComplete) :
    getPathCompletion(stringToComplete);

  // console.log(getCompletionDelta(stringToComplete, completedString));
  callback(null, getCompletionDelta(stringToComplete, completedString));
};
