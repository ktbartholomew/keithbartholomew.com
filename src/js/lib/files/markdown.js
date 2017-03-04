var File = require('./file');

// Files have contents, that's about it
var MarkdownFile = function (options) {
  File.call(this, options);

  Object.defineProperty(this, 'escapeHtml', {
    value: (options.escapeHtml !== false)
  });
};

MarkdownFile.prototype = Object.create(File.prototype);
MarkdownFile.prototype.constructor = MarkdownFile;
module.exports = MarkdownFile;
