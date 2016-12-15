var io = require('../io');
var EventEmitter = require('events');

module.exports = function (options) {
  var emitter = new EventEmitter();

  Object.defineProperty(this, 'main', {
    value: options.main.bind(this)
  });

  Object.defineProperty(this, 'stdout', {
    value: io.stdout
  });

  Object.defineProperty(this, 'stderr', {
    value: io.stderr
  });

  Object.defineProperty(this, 'exit', {
    value: function (code) {
      emitter.emit('exit', code);
    }
  });

  Object.defineProperty(this, 'addListener', {
    value: emitter.addListener.bind(emitter)
  });

  Object.defineProperty(this, 'removeListener', {
    value: emitter.removeListener.bind(emitter)
  });
};
