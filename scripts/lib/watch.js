var path = require('path');
var util = require('util');
var chokidar = require('chokidar');
var exec = require('child_process').exec;

var targets = {
  sass: {
    watch: [path.resolve(__dirname, '../../src/scss/**/*.scss')],
    exec: 'node sass.js'
  },
  webpack: {
    watch: [path.resolve(__dirname, '../../src/js/**/*')],
    exec: 'node webpack.js'
  }
};

var doExec = function (command, callback) {
  callback = callback || function () {};

  exec(command, {
    cwd: __dirname
  }, (err) => {
    return callback(err, null);
  });
};

for (var prop in targets) {
  if (!targets.hasOwnProperty(prop)) {
    continue;
  }

  (function (name, target) {
    var watcher = chokidar.watch(target.watch);
    watcher.on('ready', function () {
      watcher.on('all', function () {
        process.stdout.write('Doing \'' + name + '\'...');
        doExec(target.exec, function (err, result) {
          if (err) {
            process.stderr.write(util.inspect(err));
            process.stderr.write('\n');
          }

          process.stdout.write('done.\n');
        });
      });
    });
  })(prop, targets[prop]);
}
