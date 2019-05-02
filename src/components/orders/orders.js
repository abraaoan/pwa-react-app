import React, { Component } from 'react';
import Navbar from '../navbar';
import Search from './search';
import Status from './status';
import Pages from '../pages';
import Modal from '../modal';
import AddForm from './formAdd';
import ConfirmationModal from './confirmationModal';
import $ from 'jquery';

// ICONS
import Edit from '../../assets/edit';
import Delete from '../../assets/cancel';

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

  showAddModal = () => {
    $('#modalProduto').modal();
  }

  componentDidMount = () => {
    this.getPedidos();

    const queries = queryString.parse(this.props.location.search)
    const action = queries.action;

    if (action == 'addPedido') {
      this.showAddModal();
    }

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
            <button key="2" 
              type="button" 
              className="btn btn-primary"
              onClick={ () => { 
                $('#modalProduto').modal('hide');
                $('#confirmationModal').modal();
              }}>Confirmação</button>,
            <button key="3" type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>,
          ]}>
          <AddForm />
        </Modal>

        <ConfirmationModal
          onCancel={this.showAddModal} />

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
