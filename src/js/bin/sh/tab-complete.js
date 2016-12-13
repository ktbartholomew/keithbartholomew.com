var os = require('../../lib/os');
var fs = require('../../lib/fs');
var path = require('path-browserify');

var tabCompleteState = {
  lastString: null
};

var Completion = function (options) {
  options = options || {};

  if (!options.source && options.source !== '') {
    throw new Error('options.source is required');
  }

  this.source = options.source;
  this.multiple = options.multiple || false;
  this.string = options.string || '';
  this.stringDelta = this.string.replace(new RegExp('^' + this.source), '');
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

    return inputString.indexOf(' ') === -1 || input.cursor <= inputString.indexOf(' ');
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
          possibleCompletions.push(path.basename(file) + ' ');
        }
      });
    });

    if (possibleCompletions.length === 1) {
      return new Completion({
        source: stringToComplete,
        string: possibleCompletions[0]
      });
    }

    if (tabCompleteState.lastString === stringToComplete) {
      return new Completion({
        source: stringToComplete,
        multiple: true,
        string: possibleCompletions.join('\t')
      });
    }

    return new Completion({
      source: stringToComplete
    });
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
        possibleCompletions[0] = possibleCompletions[0] + '/';
      }

      if (fs.stat(resolvedPath).type === 'directory') {
        resolvedPath = resolvedPath + '/';
      }

      return new Completion({
        source: resolvedPath,
        multiple: false,
        string: possibleCompletions[0]
      });
    }

    if (possibleCompletions.length > 1 && tabCompleteState.lastString === stringToComplete) {
      possibleCompletions.forEach(function (item, index, array) {
        if (fs.stat(item).type === 'directory') {
          array[index] = path.basename(item) + '/';
        } else {
          array[index] = path.basename(item);
        }
      });

      return new Completion({
        source: resolvedPath,
        multiple: true,
        string: possibleCompletions.join('\t')
      });
    }

    return new Completion({
      source: resolvedPath
    });
  };

  try {
    var stringToComplete = getStringToComplete();
    var completedString = (isFirstWord())
      ? getCommandCompletion(stringToComplete)
      : getPathCompletion(stringToComplete);

    tabCompleteState.lastString = stringToComplete;
    callback(null, completedString);
  } catch (e) {
    callback(e, null);
  }
};
