// Files have contents, that's about it
module.exports = function (options) {
  Object.defineProperty(this, 'contents', {
    value: options.contents
  });
};
