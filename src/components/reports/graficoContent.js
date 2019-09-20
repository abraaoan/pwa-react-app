import React, { Component } from 'react';
import '../styles/style.css';

// API
import {
  axiosInstance as axios, 
  graficoData,
} from '../../api'; 
import { GET_GRAFICO_GERAL } from '../../api/endpoints';

export default class GraficoContent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      pies: []
    }

  }

  // --- API

  getReport = () => {

    const { currentDate } = this.props;

    // Request Products
    axios.post(GET_GRAFICO_GERAL, graficoData(currentDate))
    .then(response => {

      const result = response.data;
      this.setState({pies: result});
      
    }).catch(errors => console.error(errors));

  }

  componentDidMount = () => {
    this.getReport();
    document.title = "Cats Pedidos - Gráficos";
    
  }

  render() {
    return (
      <div style={{margin: 50}}>
        <table className="table">
          <thead>
            <tr>
              <th style={{width: '60%', textAlign: 'left'}} scope="col">Nome</th>
              <th style={{width: '20%', textAlign: 'left'}} scope="col">Tamanho</th>
              <th style={{width: '20%', textAlign: 'center'}} scope="col">Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {  this.state.pies.map( (pie, index) => {
              return (
                <tr key={index}>
                  <td style={{width: '60%', textAlign: 'left'}}>{pie.nome_produto}</td>
                  <td style={{width: '20%', textAlign: 'left'}}>{pie.tamanho}</td>
                  <td style={{width: '20%', textAlign: 'center'}}>{pie.quantidade}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="divPrintHeader"><h4>Relátorio de Gráficos</h4></div>
      </div>
    );
  }
}
