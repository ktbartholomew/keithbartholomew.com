var path = require('path-browserify');
var Executable = require('../../lib/files/executable');
var OverlayStore = require('../../lib/stores/overlay');
var fs = require('../../lib/fs');
var os = require('../../lib/os');
var getOverlay = require('./get-overlay');

module.exports = new Executable({
  main: function () {
    try {
      var pathToView = path.resolve(os.getcwd(), arguments[1]);
      if (fs.stat(pathToView).type !== 'file') {
        return this.exit(1);
      }
    } catch (e) {
      return this.exit(1);
    }

    var file = fs.read(pathToView);

    var escListener = function (e) {
      if (e.keyCode === 27) {
        OverlayStore.clearOverlay();
        window.removeEventListener('keyup', escListener);
      }
    };
    window.addEventListener('keyup', escListener);

    var changeListener = function (data) {
      if (data === null) {
        OverlayStore.removeListener('change', changeListener);
        this.exit(0);
      }
    }.bind(this);
    OverlayStore.addListener('change', changeListener);
    OverlayStore.createOverlay(getOverlay({
      path: pathToView,
      file: file
    }));
  }
});
