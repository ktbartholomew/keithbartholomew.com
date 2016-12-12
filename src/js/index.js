require('./lib/term');
var os = require('./lib/os');
var init = require('./lib/init');

init();

os.exec('/bin/cat', '/etc/motd');
os.exec('/bin/sh');
