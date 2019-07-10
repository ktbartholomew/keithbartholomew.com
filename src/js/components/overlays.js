var React = require('react');
var term = require('../lib/term').default;
var OverlayStore = require('../lib/stores/overlay');

class Overlays extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      window: null
    };

    this.handlers = {
      closeWindow: function() {
        OverlayStore.clearOverlay();
        term.focus();
      }
    };

    var changeListener = function(data) {
      this.setState({
        window: data
      });
    }.bind(this);

    OverlayStore.addListener('change', changeListener);
  }

  render() {
    var window = this.state.window || null;

    if (window === null) {
      return null;
    }

    var bodyClasses = ['body'];
    bodyClasses.push(window.type);
    bodyClasses = bodyClasses.join(' ');

    return (
      <div className="app-window">
        <div className="title-bar">
          <div className="left" />
          <div className="center">{window.title}</div>
          <div className="right">
            <button onClick={this.handlers.closeWindow}>&times;</button>
          </div>
        </div>
        <div className={bodyClasses}>{window.body}</div>
      </div>
    );
  }
}

module.exports = Overlays;
