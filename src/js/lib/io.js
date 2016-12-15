var EventEmitter = require('events');
var term = require('./term');

var IOStream = function () {
  var emitter = new EventEmitter();
  var capture = false;

  // Capture the stream to do your own thing with it. Otherwise, all data gets
  // written to the terminal immediately
  this.capture = function () {
    capture = true;
  };

  // Release the capture on the stream
  this.release = function () {
    capture = false;
  };

  // Write data to the stream
  this.write = function (data) {
    if (!capture) {
      term.write(data);
    }

    emitter.emit('data', data);
  };

  this.on = emitter.on.bind(emitter);
};

var io = {
  stdout: new IOStream(),
  stderr: new IOStream()
};

module.exports = io;
