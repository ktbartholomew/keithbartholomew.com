var fs = require('fs');
var path = require('path');
var sass = require('node-sass');

sass.render({
  file: path.resolve(__dirname, '../../src/scss/main.scss'),
  outputStyle: (process.env.NODE_ENV === 'production') ? 'compressed' : 'expanded'
}, (err, result) => {
  if (err) {
    throw err;
  }

  fs.writeFile(path.resolve(__dirname, '../../dist/css/main.css'), result.css, 'utf8');
});
