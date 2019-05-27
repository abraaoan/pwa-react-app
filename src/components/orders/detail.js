import React, { Component } from 'react';
import Navbar from '../navbar';
import Toolbar from '../toolbar';
import Alert from '../alert';
import Status from './status';
import { formatDateTime, convertProducts} from '../utils';

//API
import {
  axiosInstance as axios, 
  getPedidoPorId,
  editPedidoData, 
} from '../../api'; 
import {
  GET_PEDIDO_POR_ID,
  EDIT_PEDIDO
 } from '../../api/endpoints';

const styles = ({
  client: {
    width: '22rem',
    marginLeft: 40,
    marginRight: 0,
    marginTop: 10,
    float: 'left',
  },
  pedido: {
    width: '26rem',
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
      products: [],
      idPedido: '',
      status: 'A',
      pagamentoEfetuado: false,
      showAlert: false,
    }

  }

  onStatusChange = (e) => {
    this.setState({ status: e.target.value});
  }

  onPagamentoChange = (e) => {
    let isChecked = e.target.checked;
    this.setState({ pagamentoEfetuado: isChecked });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.sendData();
  }

  onNotification = () => {

    window.scrollTo(0, 0);
    this.setState({ showAlert: true });

    // Self close
    setTimeout(() => {
      this.setState({showAlert: false})
    }, 5000); // 5s

    this.getOrders();

  }

  // Get Client Informations
  getOrders = () => {

    const { id } = this.props.match.params;

    // Request Client
    axios.post(GET_PEDIDO_POR_ID, getPedidoPorId(id))
    .then(response => {

      const result = response.data[0];

      const products = convertProducts(result.pedido.produto_valor);
      //console.log(result);
      //console.log(products);

      this.setState({
        pedido: result.pedido,
        cliente: result.cliente,
        endereco: result.endereco,
        products,
        idPedido: id,
        status: result.pedido.status,
        pagamentoEfetuado: result.pedido.pagamento_efetuado === 'S',
      });

    }).catch(errors => console.error(errors));

  }

  // Only when editMode
  sendData = () => {

    const client = this.state.cliente ? this.state.cliente : null;
    const products = this.state.products ? this.state.products : null;
    const address = this.state.endereco ? this.state.endereco : null;

    if (!client | !address | !products)
      return

    var param = {
      id_pedido: this.state.pedido.id_pedido,
      id_cliente: client.id_cliente,
      status: this.state.status,
      id_endereco: address.id_endereco,
      taxa_entrega: this.state.pedido.taxa_entrega ? this.state.pedido.taxa_entrega : 0,
      data_pedido: this.state.pedido.data_pedido ? this.state.pedido.data_pedido : null,
      data_entrega: this.state.pedido.data_entrega ? this.state.pedido.data_entrega : null,
      observacao: this.state.pedido.observacao ? this.state.pedido.observacao : '',
      pagamento: this.state.pedido.pagamento ? this.state.pedido.pagamento : 'D',
      pagamento_efetuado: this.state.pagamentoEfetuado ? '1' : '0',
      
    }

    //23:T.CUPUACU COM CHOCOLATE:MEDIO:145:Feliz Aniversario 
    var valor_produto = "";

    for (var i = 0; i < products.length; i++ ) {
      const product = products[i];
      valor_produto += `${product.id_produto}:`;
      valor_produto += `${product.nome_produto}:`;
      valor_produto += `${product.tamanho}:`;
      valor_produto += `${product.valor_produto}:`;
      valor_produto += `${product.obs ? product.obs : ''}//`;
    }

    param['produto_valor'] = valor_produto;

    axios.post(EDIT_PEDIDO, editPedidoData(param))
    .then(response => {

      try {

        const result = response.data;

        if (result['status'] === 'ok') {
          this.onNotification();
        } else {
          alert('OPS!');
        }
        console.log('-->', result);

      } catch(errors) {
        console.error(errors);
      }

    }).catch(errors => console.error(errors));

  }

  componentDidMount = () => {
    this.getOrders();
  }

  render() {
    return (
      <div>
        <Navbar />

        <Alert 
        show={this.state.showAlert} 
        title="" 
        message="Pedido Atualizado com sucesso"
        type="success" />

        <Toolbar
            title="Detalhe do pedido" 
            hRef={process.env.PUBLIC_URL + '/pedidos?page=1'}
            linkName="Voltar para pedidos"
            shouldHideSearch={true}/>
        {/* Infors  */}
        <div className="container-fluid">
          <div className="card" style={styles.pedido}>
            <div className="card-header">
              Informações do pedido - #{this.state.idPedido}
            </div>
            <div className="card-body">
              <h5 className="card-title">{`${this.state.cliente.nome_cliente}`}</h5>
              <p className="card-text">Status atual: <Status style={{float: 'right', marginRight:200 }} value={ this.state.pedido.status } /></p>
              <p className="card-text">Data entrega: {formatDateTime(this.state.pedido.data_entrega)}</p>
              <p className="card-text">Taxa entrega: R$ {this.state.pedido.taxa_entrega},00</p>
              <p className="card-text">Data do pedido: {formatDateTime(this.state.pedido.data_pedido)}</p>
              <p className="card-text">Pagamento: {
                this.state.pedido.pagamento ? (this.state.pedido.pagamento === 'C' ? 'Cartão' : 'Dinheiro') : 'Não informado'
              }</p>

              <p style={{color:'#666666'}}>Itens:</p>
              { this.state.products.map(product => {
                return (
                  <p key={product.id_produto} style={{marginLeft: 10, marginTop: -5, fontSize: 14}}> 
                    - {`${product.id_produto}, ${product.nome_produto}, ${product.tamanho}, ${ product.valor_produto }`} 
                  </p>
                )
              }) }

              <div className="card">
                <div className="card-body">
                  <form id="orderDetailForm" onSubmit={this.onSubmit}>

                    <b>Modificar status:</b>
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="delivery"
                        id="kAberto"
                        value="A"
                        checked={this.state.status === 'A'}
                        onChange={this.onStatusChange}/>
                      <label className="form-check-label" htmlFor="kAberto">
                        Aberto
                      </label>
                    </div>
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="delivery"
                        id="kEntregue"
                        value="E"
                        checked={this.state.status === 'E'}
                        onChange ={ this.onStatusChange }/>
                      <label className="form-check-label" htmlFor="kEntregue">
                        Entregue
                      </label>
                    </div>
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="delivery"
                        id="kCancelado"
                        value="C"
                        checked={ this.state.status === 'C' }
                        onChange={ this.onStatusChange }/>
                      <label className="form-check-label" htmlFor="kCancelado">
                        Cancelado
                      </label>
                    </div>

                    <div className="form-check" style={{marginTop: 10}}>
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        name="delivery"
                        id="kPagamento"
                        onChange={this.onPagamentoChange}
                        checked={ this.state.pagamentoEfetuado }/>
                      <label className="form-check-label" htmlFor="kPagamento">
                        Pagamento efetuado
                      </label>
                    </div>

                    <button type="submit" style={{marginTop: 10}}
                      className="btn btn-primary mr-auto">Atualizar pedido</button>
                  </form>
                </div>
              </div>
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
