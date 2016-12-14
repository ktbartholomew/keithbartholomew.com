var Directory = require('./files/directory');
var File = require('./files/file');
var Image = require('./files/image');
var fs = require('./fs');

module.exports = function () {
  fs.write('/', new Directory());
  fs.write('/bin', new Directory());
  fs.write('/etc', new Directory());
  fs.write('/home', new Directory());
  fs.write('/home/website', new Directory());
  fs.write('/sbin', new Directory());
  fs.write('/usr', new Directory());
  fs.write('/usr/bin', new Directory());
  fs.write('/var', new Directory());

  fs.write('/bin/cat', require('../bin/cat'));
  fs.write('/usr/bin/cd', require('../bin/cd'));
  fs.write('/bin/ls', require('../bin/ls'));
  fs.write('/bin/pwd', require('../bin/pwd'));
  fs.write('/sbin/reboot', require('../sbin/reboot'));
  fs.write('/bin/mkdir', require('../bin/mkdir'));
  fs.write('/bin/sh', require('../bin/sh'));

  fs.write('/etc/motd', new File({contents: require('raw!../etc/motd')}));
  fs.write('/etc/resolv.conf', new File({contents: require('raw!../etc/resolv.conf')}));
  fs.write('/etc/passwd', new File({contents: require('raw!../etc/passwd')}));
  fs.write('/etc/shadow', new File({contents: require('raw!../etc/shadow')}));
  fs.write('/etc/group', new File({contents: require('raw!../etc/group')}));
  fs.write('/home/otheruser', new Directory());
  fs.write('/home/website/help.md', new File({contents: require('raw!../home/help.md')}));
  fs.write('/home/website/about-me.md', new File({contents: require('raw!../home/about-me.md')}));
  fs.write('/home/website/links', new Directory());
  fs.write('/home/website/photos', new Directory());
  fs.write('/home/website/photos/keith.jpg', new Image({src: '/dist/img/keith.jpg'}));
};
