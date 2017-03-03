var chalk = require('chalk');
var File = require('./file');

// Files have contents, that's about it
var ImageFile = function (options) {
  options.contents = chalk.red('Not a text file. Try using `open`.');
  File.call(this, options);

  Object.defineProperty(this, 'src', {
    value: options.src
  });
};

ImageFile.prototype = Object.create(File.prototype);
ImageFile.prototype.constructor = ImageFile;
module.exports = ImageFile;
