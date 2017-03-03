var File = require('./file');

// Hyperlinks have an href attribute, and should be opened with `open`
var Hyperlink = function (options) {
  options.contents = 'Hint: use `open` to open this link in a new tab.\r\n\n' + options.href;
  File.call(this, options);

  Object.defineProperty(this, 'href', {
    value: options.href
  });
};

Hyperlink.prototype = Object.create(File.prototype);
Hyperlink.prototype.constructor = Hyperlink;
module.exports = Hyperlink;
