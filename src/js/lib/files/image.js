var chalk = require('chalk');
var File = require('./file');

// Files have contents, that's about it
var Image = function (options) {
  options.contents = chalk.red('Not a text file. Try using `view`.');
  File.call(this, options);

  Object.defineProperty(this, 'src', {
    value: options.src
  });
};

Image.prototype = Object.create(File.prototype);
Image.prototype.constructor = Image;
module.exports = Image;
