var fs = require('./fs');

var env = {
  HOME: '/home/website',
  PATH: '/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin',
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
