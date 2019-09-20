import React, { Component } from 'react';
import Navbar from '../navbar';
import Toolbar from '../toolbar';
import MaskedInput from 'react-maskedinput';
import ReactToPrint from 'react-to-print';
import ListagemContent from './listagemContent';

export default class Listagem extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentDate: '',
    }

  }

  // --- OnChanges

  onDateChange = (e) => {
    this.setState({currentDate: e.target.value});
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter')
      this.refs.content.getReport()
  }

  

  render() {
    return (
      <div>
        <Navbar />
        <Toolbar 
          shouldHideSearch={true} 
          linkName="Voltar para relatórios" 
          title="Listagem"
          hRef={process.env.PUBLIC_URL + '/relatorios'} />
        
        <div className="input-group" style={{width: 260, marginLeft: 60, float: 'left'}}>
          <MaskedInput type="text" 
              className="form-control"
              placeholder="01/01/2019"
              mask="11/11/1111"
              aria-describedby="basic-addon1"
              value={this.state.currentDate}
              onChange={this.onDateChange}
              onKeyPress={this.onKeyPress}/>
          <div className="input-group-prepend">
            <div className="btn-group" role="group">
              <button id="btnGroupDrop1" 
              type="button" 
              className="btn btn-primary"
              onClick={ () => { this.refs.content.getReport() }}>
                Filtrar
              </button>
            </div>
          </div>
        </div>
        <div style={{marginLeft: 20, marginBottom: 50, float: 'left'}}>
          <ReactToPrint
          trigger={() => <button type="button" className="btn btn-primary">Imprimir</button>}
          content={() => this.refs.content}
          pageStyle="
          @page {
            size: A4;
          }
            @media print {
              div.divPrintHeader {
                position: fixed;
                top: 0;
              }
            }
          "
          />
        </div>
        <div className="container-fluid">
          <ListagemContent ref="content" currentDate={this.state.currentDate}/>
        </div>
      </div>
    )
  }
}
