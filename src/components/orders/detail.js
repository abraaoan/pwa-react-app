import React, { Component } from 'react';
import Navbar from '../navbar';
import Toolbar from '../toolbar';
import Alert from '../alert';
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
            hRef={process.env.PUBLIC_URL + '/pedidos?page=1'}
            linkName="Voltar para pedidos"
            shouldHideSearch={true}/>
        {/* Infors  */}
        <div className="container-fluid">
          <div className="card" style={styles.client}>
            <div className="card-header">
              Informações do pedido - #{this.state.idPedido}
            </div>
            <div className="card-body">
              <h5 className="card-title">{`${this.state.cliente.nome_cliente}`}</h5>
              <p className="card-text">Status: <Status value={ this.state.pedido.status } /></p>
              <p className="card-text">Data entrega: {formatDateTime(this.state.pedido.data_entrega)}</p>
              <p className="card-text">Taxa entrega: R$ {this.state.pedido.taxa_entrega},00</p>
              <p className="card-text">Data do pedido: {formatDateTime(this.state.pedido.data_pedido)}</p>
              <button type="button" 
                className="btn btn-primary mr-auto">Cancelar pedido</button>
            </div>
          </div>
        </div>
        {/* Endereco */}
        <div className="container-fluid">
          <div className="card" style={styles.client}>
            <div className="card-header">
              Endereço de entrega
            </div>
            <div className="card-body">
              <p className="card-text">Logradouro: {this.state.endereco.logradouro}</p>
              <p className="card-text">Bairro: {this.state.endereco.bairro}</p>
              <p className="card-text">Número: {this.state.endereco.numero}</p>
              <p className="card-text">CEP: {this.state.endereco.cep}</p>
              <p className="card-text">Referência: {this.state.endereco.referencia}</p>
              <p className="card-text">Complemento: {this.state.endereco.complemento}</p>
            </div>
          </div>
        </div>
        {/* Endereco */}
        <div className="container-fluid">
          <div className="card" style={styles.client}>
            <div className="card-header">
              Dados do cliente
            </div>
            <div className="card-body">
              <h5 className="card-title">{`${this.state.cliente.nome_cliente}`}</h5>
              <p className="card-text">ID: {this.state.cliente.id_cliente}</p>
              <p className="card-text">Telefone: {this.state.cliente.telefone1}</p>
              <p className="card-text">Telefone outros: {this.state.cliente.telefone2 ? this.state.cliente.telefone2 : 'inexistente'}</p>
              <p className="card-text">Lista negra? <b>{this.state.cliente.lista_negra === '0' ? 'Não': 'SIM'}</b></p>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
