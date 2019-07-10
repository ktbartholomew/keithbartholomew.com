var React = require('react');
import term from '../lib/term';

export default class Terminal extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();

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
    term.open(this.ref.current, false);
    this.resizeTerminal();
    term.focus();

    window.addEventListener('resize', this.resizeTerminal);
  }

  render() {
    return <div ref={this.ref} />;
  }
}
