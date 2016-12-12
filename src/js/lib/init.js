var Directory = require('./files/directory');
var File = require('./files/file');
var fs = require('./fs');

module.exports = function () {
  fs.write('/', new Directory());
  fs.write('/bin', new Directory());
  fs.write('/etc', new Directory());
  fs.write('/home', new Directory());
  fs.write('/home/website', new Directory());
  fs.write('/sbin', new Directory());
  fs.write('/usr', new Directory());
  fs.write('/var', new Directory());

  fs.write('/bin/cat', require('../bin/cat'));
  fs.write('/usr/bin/cd', require('../bin/cd'));
  fs.write('/bin/ls', require('../bin/ls'));
  fs.write('/bin/pwd', require('../bin/pwd'));
  fs.write('/bin/motd', require('../bin/motd'));
  fs.write('/bin/mkdir', require('../bin/pwd'));
  fs.write('/bin/sh', require('../bin/sh'));

  fs.write('/etc/motd', new File({contents: require('raw!../etc/motd')}));
};
