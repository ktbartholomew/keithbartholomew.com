// @ts-check
var fs = require('./fs');
var path = require('path-browserify');

var env = {
  HOME: '/home/website',
  PATH: '/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin',
  PWD: '/home/website' + window.location.pathname,
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
  /**
   * @param {string} dir
   * @param {boolean} [skipUpdate]
   */
  chdir: function (dir, skipUpdate) {
    if (fs.stat(dir).type !== 'directory') {
      throw new Error(dir + ': Not a directory');
    }

    env.PWD = cwd = dir;

    if (!skipUpdate) {
      updateLocation(env.PWD);
    }
  },
  exec: function (argv, callback) {
    callback = callback || function () {};

    if (fs.stat(argv[0]).type !== 'executable') {
      return callback(new Error(argv[0] + ' is not an Executable'), null);
    }

    var executable = fs.read(argv[0]);

    var onExit = function (code) {
      executable.removeListener('exit', onExit);
      return callback(null, code);
    };
    executable.addListener('exit', onExit);

    executable.main.apply(undefined, argv);
  }
};

var updateLocation = function (dir) {
  if (!env.PWD.startsWith(env.HOME) || env.PWD === env.HOME) {
    window.history.pushState({PWD: env.PWD}, '', '/');
    return;
  }

  window.history.pushState({PWD: env.PWD}, '', env.PWD.replace(env.HOME, ''));
};

var onLocationChange = function (e) {
  module.exports.chdir(path.resolve(env.HOME, e.target.location.pathname), true);
};

window.addEventListener('popstate', onLocationChange);
