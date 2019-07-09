var path = require('path-browserify');
var React = require('react');
var ReactMarkdown = require('react-markdown');
var ImageFile = require('../../lib/files/image');
var MarkdownFile = require('../../lib/files/markdown');

module.exports = function (options) {
  var overlayConfig = {
    title: path.basename(options.path),
    type: null,
    body: <div />
  };

  if (options.file instanceof ImageFile) {
    overlayConfig.type = 'image';
    overlayConfig.body = (<img src={options.file.src} alt={options.file.alt}/>);

    return overlayConfig;
  }

  if (options.file instanceof MarkdownFile) {
    overlayConfig.type = 'markdown';
    overlayConfig.body = <ReactMarkdown source={options.file.contents} escapeHtml={options.file.escapeHtml} />;

    return overlayConfig;
  }

  overlayConfig.type = 'plain';
  overlayConfig.body = <div>{options.file.contents}</div>;
  return overlayConfig;
};
