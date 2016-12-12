var fs = require('./fs');

var env = {
  HOME: '/home/website',
  PATH: '/bin:/sbin:/usr/bin:/usr/sbin',
  PWD: '/home/website',
  SHLVL: '1',
  TERM: 'xterm',
  USER: 'website'
};

var cwd = env.PWD;

module.exports = {
  getenv: function () {
    return env;
  },
  getcwd: function () {
    return cwd;
  },
  chdir: function (dir) {
    if (fs.stat(dir).type !== 'directory') {
      throw new Error(dir + ': Not a directory');
    }

    env.PWD = cwd = dir;
  },
  exec: function () {
    if (fs.stat(arguments[0]).type !== 'executable') {
      throw new Error(arguments[0] + ' is not an Executable');
    }

    fs.read(arguments[0]).main.apply(undefined, arguments);
  }
};
