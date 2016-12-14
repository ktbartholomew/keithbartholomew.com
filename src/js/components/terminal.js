var React = require('react');
var term = require('../lib/term');

class Terminal extends React.Component {
  constructor (props) {
    super(props);

    this.resizeTerminal = function () {
      var cols = Math.floor(window.innerWidth / term.charMeasureElement.getBoundingClientRect().width) - 1;
      var rows = Math.floor(window.innerHeight / term.charMeasureElement.getBoundingClientRect().height);
      term.resize(cols, rows);
    };
  }

  componentDidMount () {
    term.open(this.refs.target);
    this.resizeTerminal();
    term.focus();

    window.addEventListener('resize', this.resizeTerminal);
  }

  render () {
    return (
      <div ref='target' />
    );
  }
}

module.exports = Terminal;
