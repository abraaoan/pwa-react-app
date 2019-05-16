import React, { Component } from 'react';
import Navbar from '../navbar';
import Toolbar from '../toolbar';
import Alert from '../alert';
import $ from 'jquery';
import Status from './status';
import {formatDateTime} from '../utils';

//API
import {
  axiosInstance as axios, 
  getPedidoPorId,
} from '../../api'; 
import {
  GET_PEDIDO_POR_ID,
 } from '../../api/endpoints';

const styles = ({
  client: {
    width: '22rem',
    marginLeft: 40,
    marginRight: 0,
    marginTop: 10,
    float: 'left',
  },
  address: {
    width: '22rem',
    marginLeft: 40,
    marginRight: 0,
    marginTop: 10,
    float: 'left',
  },
});

export default class Detail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pedido: {},
      endereco: {},
      cliente: {},
      idPedido: '',
    }

  }

  // Get Client Informations
  getOrders = (id) => {

    // Request Client
    axios.post(GET_PEDIDO_POR_ID, getPedidoPorId(id))
    .then(response => {

      const result = response.data[0];
      
      console.log(result);

      this.setState({
        pedido: result.pedido,
        cliente: result.cliente,
        endereco: result.endereco,
        idPedido: id,
      });

    }).catch(errors => console.error(errors));

  }

  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.getOrders(id);
  }

  render() {
    return (
      <div>
        <Navbar />

        <Alert 
        show={this.state.showAlert} 
        title={this.state.alertTitle} 
        message={`${this.state.alertMessage}.`}
        type={this.state.alertType} />

        <Toolbar
            title="Detalhe do pedido" 
            hRef={process.env.PUBLIC_URL + '/orders?page=1'}
            linkName="Voltar para pedidos"
            shouldHideSearch={true}/>
        <div className="container-fluid">
          <div className="card" style={styles.client}>
          <div className="card-header">
              Informações do pedido - #{this.state.idPedido}
            </div>
            <div className="card-body">
               <h5 className="card-title">{`${this.state.cliente.nome_cliente}`}</h5>
              <p className="card-text">Status: <Status value={ this.state.pedido.status } /></p>
              <p className="card-text">Data entrega: {formatDateTime(this.state.pedido.data_entrega)}</p>
              {/*<p className="card-text">Telefone outros: {this.state.client.telefone2 ? this.state.client.telefone2 : 'inexistente'}</p>
              <p className="card-text">Lista negra? <b>{this.state.client.lista_negra === '0' ? 'Não': 'SIM'}</b></p>
              <button type="button" 
                className="btn btn-primary mr-auto"
                data-toggle="modal" 
                data-target=".bd-example-modal-lg"
                onClick={() => { this.refs.form.clearFields(); }}>Adicionar endereço</button> */}
            </div>
          </div>

        </div>
      </div>
    )
  }
}
