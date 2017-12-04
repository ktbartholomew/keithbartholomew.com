const path = require('path');
const webpack = require('webpack');

var config = {
  context: __dirname,
  entry: {
    index: path.resolve(__dirname, '../../src/js/index.js')
  },
  stats: {
    chunks: false
  },
  output: {
    path: path.resolve(__dirname, '../../dist/js'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['env', 'react']
        }
      }
    ]
  },
  plugins: []
};

if (process.env.NODE_ENV === 'production') {
  // replace "process.env.NODE_ENV" with "production" to avoid bundling all of
  // the React devtools code
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  );

  // Drop unused code, mangle, and compress
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        unused: true,
        drop_debugger: true
      }
    })
  );
}

module.exports = config;
