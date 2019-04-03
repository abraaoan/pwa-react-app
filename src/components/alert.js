import React, { Component } from 'react';

const style = {

  showing: {
    position: 'absolute',
    width: '80%',
    marginLeft: '10%',
    zIndex: 1,
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

      if (this.state.isHidden) {
        setTimeout(() => {
          this.setState({isHidden: true})
        }, 3000); // 3s
      }

    }

  }

  render() {

    return (
      <div>
          <div id="alert" style={this.state.isHidden ? style.hidden : style.showing} className="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Produto adicionado com sucesso!</strong> Torta de limão com cobertura de laranja lima.
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
      </div>
    )
  }
}