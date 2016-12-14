var React = require('react');
var term = require('../lib/term');

class Overlays extends React.Component {
  constructor (props) {
    super(props);

    this.handlers = {
      closeWindow: function () {
        this.setState({
          window: null
        });

        term.focus();
      }.bind(this)
    };
  }

  render () {
    var window = this.props.window || null;

    if (window === null) {
      return null;
    }

    var bodyClasses = ['body'];
    bodyClasses.push(window.type);
    bodyClasses = bodyClasses.join(' ');

    return (
      <div className='app-window'>
        <div className='title-bar'>
          <div className='left' />
          <div className='center'>{window.title}</div>
          <div className='right'>
            <button onClick={this.handlers.closeWindow}>&times;</button>
          </div>
        </div>
        <div className={bodyClasses}>
          {window.body}
        </div>
      </div>
    );
  }
}

module.exports = Overlays;
