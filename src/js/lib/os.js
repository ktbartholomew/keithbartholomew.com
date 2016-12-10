var fs = require('./fs');
var Executable = require('./files/executable');
var Directory = require('./files/directory');

var env = {
  HOME: '/home/website',
  PATH: '/bin:/sbin:/usr/bin:/usr/sbin',
  PWD: '/home/website',
  SHLVL: '1',
  TERM: 'xterm',
  USER: 'website'
};

var cwd = env.PWD;

fs.write('/', new Directory());
fs.write('/bin', new Directory());
fs.write('/etc', new Directory());
fs.write('/home', new Directory());
fs.write('/home/website', new Directory());
fs.write('/sbin', new Directory());
fs.write('/usr', new Directory());
fs.write('/var', new Directory());

fs.write('/usr/bin/cd', require('../bin/cd'));
fs.write('/bin/ls', require('../bin/ls'));
fs.write('/bin/pwd', require('../bin/pwd'));
fs.write('/bin/motd', require('../bin/motd'));
fs.write('/bin/sh', require('../bin/shell'));

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
    if (fs.read(arguments[0]) instanceof Executable === false) {
      throw new Error(arguments[0] + ' is not an Executable');
    }

    fs.read(arguments[0]).main.apply(undefined, arguments);
  }
};
