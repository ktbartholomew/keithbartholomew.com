var EventEmitter = require('events');

var store = null;

var storeEmitter = new EventEmitter();

var notifyListeners = function () {
  storeEmitter.emit('change', store);
};

module.exports = {
  addListener: function () {
    storeEmitter.addListener.apply(storeEmitter, arguments);
  },
  removeListener: function () {
    storeEmitter.removeListener.apply(storeEmitter, arguments);
  },
  createOverlay: function (options) {
    store = {
      title: options.title,
      type: options.type || null,
      body: options.body
    };
    notifyListeners();
  },
  clearOverlay: function () {
    store = null;
    notifyListeners();
  },
  getOverlay: function () {
    return store;
  }
};
