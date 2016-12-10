module.exports = function (options) {
  Object.defineProperty(this, 'main', {
    value: options.main
  });
};
