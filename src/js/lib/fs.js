var filesystem = {};

var FILE_TYPES = {
  DIRECTORY: require('./files/directory'),
  EXECUTABLE: require('./files/executable'),
  FILE: require('./files/file'),
  IMAGE: require('./files/image'),
  MARKDOWN: require('./files/markdown'),
  HYPERLINK: require('./files/hyperlink')
};

module.exports = {
  stat: function (path) {
    var stats = {
      type: null
    };

    if (!filesystem.hasOwnProperty(path)) {
      return stats;
    }

    if (filesystem[path] instanceof FILE_TYPES.DIRECTORY) {
      stats.type = 'directory';
      return stats;
    }

    if (filesystem[path] instanceof FILE_TYPES.EXECUTABLE) {
      stats.type = 'executable';
      return stats;
    }

    if (filesystem[path] instanceof FILE_TYPES.HYPERLINK) {
      stats.type = 'hyperlink';
      return stats;
    }

    if (filesystem[path] instanceof FILE_TYPES.MARKDOWN) {
      stats.type = 'markdown';
      return stats;
    }

    if (filesystem[path] instanceof FILE_TYPES.IMAGE) {
      stats.type = 'image';
      return stats;
    }

    if (filesystem[path] instanceof FILE_TYPES.FILE) {
      stats.type = 'file';
      return stats;
    }
  },
  write: function (path, contents) {
    filesystem[path] = contents;
  },
  read: function (path) {
    if (
      ['file', 'executable', 'hyperlink', 'image', 'markdown'].indexOf(
        this.stat(path).type
      ) !== -1
    ) {
      return filesystem[path];
    } else {
      throw new Error(path + ': No such file or directory');
    }
  },
  scan: function (path) {
    path = path.charAt(path.length - 1) === '/' ? path : path + '/';
    var scanPattern = new RegExp('^' + path + '[^/]+?$');
    var matches = [];

    Object.keys(filesystem).forEach(function (filename) {
      if (filename.match(scanPattern)) {
        matches.push(filename);
      }
    });

    return matches;
  }
};
