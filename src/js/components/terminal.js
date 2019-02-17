var React = require('react');
var term = require('../lib/term');

class Terminal extends React.Component {
  constructor(props) {
    super(props);

    this.parentID = 'terminal-parent';

    this.resizeTerminal = function() {
      var cols =
        Math.floor(
          window.innerWidth /
            term.charMeasureElement.getBoundingClientRect().width
        ) - 1;
      var rows = Math.floor(
        window.innerHeight /
          term.charMeasureElement.getBoundingClientRect().height
      );
      term.resize(cols, rows);
    };
  }

  componentDidMount() {
    term.open(document.getElementById(this.parentID));
    this.resizeTerminal();
    term.focus();

    window.addEventListener('resize', this.resizeTerminal);
  }

  render() {
    return <div id={this.parentID} />;
  }
}

module.exports = Terminal;
