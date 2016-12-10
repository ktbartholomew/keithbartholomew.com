const path = require('path');

module.exports = {
  context: __dirname,
  entry: {
    index: path.resolve(__dirname, 'src/js/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].js'
  }
};
