import React, { Component } from 'react';
import '../styles/style.css';

// API
import {
  axiosInstance as axios, 
  listagemData,
} from '../../api'; 
import { LISTAGEM_POR_CATEGORIA, LISTAGEM_GERAL } from '../../api/endpoints';
import {formatDateTime} from '../utils';

export default class ListagemContent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      orders: []
    }

  }

  // --- API

  getReport = () => {

    const { currentDate, currentCategory } = this.props;
    const groupBy = function(xs, key) {
      return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };

    const category = currentCategory === 'Todas' ? null : currentCategory;

    // Request Products
    axios.post(category ? LISTAGEM_POR_CATEGORIA : LISTAGEM_GERAL, listagemData(currentDate, currentCategory))
    .then(response => {

      const result = response.data;
      const orders = result.sort((a, b) => (a.horario > b.horario) ? 1 : -1)
      const group = groupBy(orders, 'horario');
      
      this.setState({orders: group});
      console.log(group);
      
    }).catch(errors => console.error(errors));

  }

  componentDidMount = () => {
    this.getReport();
    document.title = "Cats Pedidos - Listagem";
    
  }

  render() {

    const { currentDate, currentCategory } = this.props;

    return (
      <div style={{margin: 50}}>
        <div style={{textAlign: 'right', float: 'left', width: '100%'}}>
          <small className="text-muted">{currentDate}</small>
        </div>
        { Object.keys(this.state.orders).map( (time, index) => {
          return(
            <div 
              key={index}
              style={{marginBottom: 30, float: 'left', width: '100%', color: '#666'}}>
              <h4>{ formatDateTime(time, true, true).slice(0, -3) }</h4>
              <TableView orders={this.state.orders[time]}/>
            </div>
          );
        })}
        <div className="divPrintHeader">
          <h4>Relátorio de Listagem { currentCategory ? `- ${currentCategory}` : '' }</h4>
        </div>
      </div>
    );
  }
}

class TableView extends Component {
  render() {

    const { orders } = this.props;

    return ( 
      <div>
        <table className="table">
          <thead>
            <tr>
              <th style={{width: '60%', textAlign: 'left'}} scope="col">Item</th>
              <th style={{width: '15%', textAlign: 'left'}} scope="col">Valor</th>
              <th style={{width: '25%', textAlign: 'left'}} scope="col">Observação</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => {
              return(
                <tr>
                  <td>{order.item}</td>
                  <td>{`R$ ${order.valor},00`}</td>
                  <td>{order.pedido_produto_observacao}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div> 
    );
  }
}
