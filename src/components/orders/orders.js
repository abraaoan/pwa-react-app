import React, { Component } from 'react';
import Navbar from '../navbar';
import Search from './search';
import Status from './status';
import Pages from '../pages';
import Modal from '../modal';
import $ from 'jquery';

// ICONS
import Edit from '../../assets/edit';
import Delete from '../../assets/cancel';
import Remove from '../../assets/delete';

// REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addOrders } from '../../actions';

// APIS
import queryString from 'query-string';
import {
  axiosInstance as axios,
  getPedidosPaginacaoData as data,
} from '../../api'; 
import { 
  GET_PEDIDO_PAGINACAO,
} from '../../api/endpoints';

const styles = ({
  listView: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: 20,
  },
  cards: {
    marginTop: 10
  }
});


class Orders extends Component {

  constructor(props){
    super(props);

    this.state = {
      pagination: [],
      pedidos: [],
      currentPage: 1,
    }

  }

  getPedidos = () => {
    const queries = queryString.parse(this.props.location.search)
    const paginaAtual = queries.page;
    const newData = data(6, paginaAtual, '2019-01-01'); // TODO: Change date

    // Request Clients
    axios.post(GET_PEDIDO_PAGINACAO, newData)
    .then(response => {

      const result = response.data;
      const pagination = result.pop();
      const apiPedidos = result;

      this.props.addOrders(apiPedidos);

      this.setState({
        pagination: pagination['paginacao'],
        currentPage: parseInt(queries.page),
      });

    }).catch(errors => console.error(errors));

  }

  componentDidMount = () => {
    this.getPedidos();

    setTimeout(() => {
      $('#modalProduto').modal();
    }, 1000); 

  }

  render() {

    const { orders } = this.props;

    return (
      <div>
        <Navbar />
        <Search 
          title="Pedidos"/>
        
        <div style={styles.listView}>
        <table id="tableClients" className="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Telefone 1</th>
              <th scope="col">Data e hora</th>
              <th scope="col">Entrega</th>
              <th scope="col">Taxa</th>
              <th scope="col">Status</th>
              <th scope="col" colSpan="2"></th>
            </tr>
          </thead>
          <tbody>
            
              {orders.map(order => {
                return(
                  <tr key={order.pedido.id_pedido}>
                    <th scope="row" className="data">{order.pedido.id_pedido}</th>
                    <td>
                      {order.cliente.nome_cliente}
                    </td>
                    <td>
                      {order.cliente.telefone1}
                    </td>
                    <td>
                      {order.pedido.data_entrega}
                    </td>
                    <td>
                      {order.endereco.bairro}
                    </td>
                    <td>
                      R$ {order.pedido.taxa_entrega}
                    </td>
                    
                    <td>
                      <Status value={order.pedido.status} />
                    </td>
                    <td style={{width: 50}}>
                      <button 
                        type="button" 
                        className="btn btn-link" 
                        data-toggle="tooltip" data-placement="bottom" title="Editar pedido">
                        <Edit />
                      </button>
                    </td>
                    <td style={{width: 50}}>
                      <button 
                        type="button" 
                        className="btn btn-link" 
                        data-toggle="tooltip" data-placement="bottom" title="Cancelar pedido">
                        <Delete />
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        {/* Add and Pagination */}
        <div className="d-flex flex-row justify-content-end">
          <Pages path="pedidos" pagination={this.state.pagination} currentPage={this.state.currentPage} />  
        </div>

        <Modal 
          title="Abertura de pedido"
          buttons={[
            <button key="2" type="button" className="btn btn-primary">Confirmação</button>,
            <button key="3" type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>,
          ]}>
          {/* Cliente */}
          <div className="card" style={styles.cards}>
            <div className="card-header">
              Cliente
            </div>
            <div className="card-body container">
              <div className="row">
                <p className="col-4 card-text">Nome: Rivaplay</p>
                <p className="col card-text">Telefone: 9999-9999</p>
              </div>
              <div className="row">
                <p className="col-4 card-text">
                  Data e hora da entregada:
                </p>
                <div className="col-4">
                <input className="form-control form-control-sm" type="text" placeholder="01/01/2019 14:00" />
                </div>
              </div>
              <div className="row">
                <p className="col-2 card-text">
                  Status: 
                </p>
                <div className="col-8">
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked />
                    <Status value="A"/>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                    <Status value="C"/>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                    <Status value="E"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Endereço */}
          <div className="card" style={styles.cards}>
            <div className="card-header">
              Endereço
            </div>
            <div className="card-body">

              <div className="row">
                <p className="card-text col">Local de entrega</p>
                <p className="card-text col">Retirada na loja</p>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                    <label class="form-check-label" for="exampleRadios1">
                      Endereço A
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                    <label class="form-check-label" for="exampleRadios1">
                      Endereço B
                    </label>
                  </div>
                </div>
                <div className="col">
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                    <label class="form-check-label" for="exampleRadios1">
                      Centro
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                    <label class="form-check-label" for="exampleRadios1">
                      Vieralves
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="button" 
                className="btn btn-primary"
                data-toggle="tooltip" 
                style={{marginTop: 12}}
                data-placement="bottom" title="Remove produto" disabled>
                Adicionar Endereço
              </button>
            </div>
          </div>

          {/* Endereço */}
          <div className="card" style={styles.cards}>
            <div className="card-header">
              Produtos
            </div>
            <div className="card-body">
              <table id="tableClients" className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item</th>
                    <th scope="col">Valor</th>
                    <th scope="col" colSpan="2">Observação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className="data">0</th>
                    <td>
                      Torta de Cupu
                    </td>
                    <td>
                      R$ 120,00
                    </td>
                    <td>
                      Feliz Aniversário
                    </td>
                    <td style={{width: 50}}>
                      <button 
                        type="button" 
                        className="btn btn-link" 
                        data-toggle="tooltip" data-placement="bottom" title="Remove produto">
                        <Remove />
                      </button>
                    </td>
                  </tr>  
                </tbody>
              </table>
              <button 
                type="button" 
                className="btn btn-primary"
                data-toggle="tooltip" data-placement="bottom" title="Remove produto">
                Adicionar
              </button>
            </div>
          </div>
        </Modal>

      </div>
    </div>
    )
  }
}

const mapStateToProps = (store) => ({
  orders: store.orderState.orders
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addOrders }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
