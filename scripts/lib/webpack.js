var util = require('util');
var webpack = require('webpack');
var config = require('./webpack.config.js');

webpack(config).run(function (err, stats) {
  var hasErrors = (stats.compilation.errors && stats.compilation.errors.length);

  if (err) {
    process.stderr.write(util.inspect(err));
    return process.exit(1);
  }

  if (hasErrors) {
    stats.compilation.errors.forEach(function (error) {
      process.stderr.write(error.message);
    });

    return process.exit(1);
  }

  return process.exit(0);
});
