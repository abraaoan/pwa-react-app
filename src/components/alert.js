import React, { Component } from 'react';

const style = {

  showing: {
    position: 'absolute',
    width: '80%',
    marginLeft: '10%',
    zIndex: 999,
    opacity: '1',
    transition: 'opacity 0.5s',
  },
  hidden: {
    position: 'absolute',
    width: '80%',
    marginLeft: '10%',
    opacity: '0',
    transition: 'opacity 0.5s',
  }
}

export default class Alert extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isHidden: !props.show //initial value
    }

  }

  componentWillReceiveProps = (newProps) => {

    const oldProps = this.props
    if(oldProps.show !== newProps.show) {
      this.setState({ isHidden: !newProps.show });
    }

  }

  render() {

    const {title, message, type, alertStyle} = this.props;
    const defaultStyle = this.state.isHidden ? style.hidden : style.showing
    return (
      <div>
          <div
           id="alert"
           style={{...defaultStyle, ...alertStyle}}
           className={`alert alert-${type} alert-dismissible fade show`}
           role="alert">
            <strong>{title}</strong> <span>{`${message}`}</span>
            <button type="button" className="close" aria-label="Close" onClick={() => { this.setState({ isHidden: true }); }}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
      </div>
    )
  }
}