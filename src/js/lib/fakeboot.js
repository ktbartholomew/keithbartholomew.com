import term from './term';
import bootlog from 'raw-loader!../var/bootlog';

export default function (callback) {
  let lines = bootlog.split('\n');
  callback = callback || function () {};

  if (window.location.pathname !== '/') {
    return callback();
  }

  var writeLogLine = function () {
    var line = lines.shift();

    if (typeof line === 'undefined') {
      term.clear();
      return callback();
    }

    term.writeln(line);
    window.requestAnimationFrame(writeLogLine);
  };

  writeLogLine();
}
