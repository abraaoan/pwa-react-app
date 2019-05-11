import React, { Component } from 'react';
import Navbar from '../navbar';
import Search from './search';
import Status from './status';
import Pages from '../pages';
import Modal from '../modal';
import AddForm from './formAdd';
import AddProductModal from './addProductModal';
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
  GET_PEDIDO_STATUS_PAG
} from '../../api/endpoints';

const styles = ({
  listView: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: 20,
  },
  filters: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: 10,
    float: 'left',

  },
  filter: {
    marginLeft: 20,
  },
  dateFilter: {
    marginTop: 10,
    marginLeft: -40,
    width: 200,
    marginRight:-18
  }
});


class Orders extends Component {

  constructor(props){
    super(props);

    this.state = {
      pagination: [],
      pedidos: [],
      currentPage: 1,
      currentStatus: 'T',
      currentDate: '',
      currentProducts: [],
      confirmation: {},
    }

  }

  getPedidos = (status, date) => {
    const queries = queryString.parse(this.props.location.search)
    const paginaAtual = queries.page;
    const newData = data(6, paginaAtual, date, status);
    const urlParam = status === 'T' ? GET_PEDIDO_PAGINACAO : GET_PEDIDO_STATUS_PAG;

    this.props.addOrders([]);

    // Request Clients
    axios.post(urlParam, newData)
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

  changeStatus = (status) => {
    this.getPedidos(status);
    this.setState({ currentStatus: status });
  }

  filterByDate = () => {
    this.getPedidos(this.state.currentStatus, this.state.currentDate);
  }

  // ---

  onDateChange = (e) => {
    this.setState({currentDate: e.target.value});
  }

  showAddModal = () => {
    $('#modalProduto').modal();
  }

  showAddProductsModal = () => {
    $('#modalProduto').modal('hide');
    $('#addProductModal').modal();
  }

  onProductsModalFinish = (products) => {
    this.setState({
      currentProducts: products
    });    
  }

  removeProduct = (product) => {
    var all = [...this.state.currentProducts];
    const index = all.indexOf(product);
    if (index !== -1){
      all.splice(index, 1);
      this.setState({
        currentProducts: all
      });
    }
      
  }

  confirmarPedido = (confirmation) => {

    this.setState({ confirmation });

    $('#modalProduto').modal('hide');
    $('#confirmationModal').modal();
  
  }

  componentDidMount = () => {
    this.getPedidos('T');

    const queries = queryString.parse(this.props.location.search)
    const action = queries.action;

    if (action === 'addPedido') {
      this.showAddModal();
    }

  }

  render() {

    const { orders } = this.props;
    const { client } = this.props.location;

    return (
      <div>
        <Navbar />
        <Search 
          title="Pedidos"/>

        <div style={styles.filters}>
          <button 
            type="button" 
            className={`btn btn${this.state.currentStatus === 'T' ? '' : '-outline'}-primary`}
            onClick={ () => { this.changeStatus('T') }}>
            Todos
          </button>
          <button 
            style={styles.filter} 
            type="button" 
            className={`btn btn${this.state.currentStatus === 'A' ? '' : '-outline'}-warning`}
            onClick={ () => { this.changeStatus('A') }}>
            Abertos
          </button>
          <button 
            style={styles.filter}
            type="button"
            className={`btn btn${this.state.currentStatus === 'C' ? '' : '-outline'}-danger`}
            onClick={ () => { this.changeStatus('C') }}>
            Cancelados
          </button>
          <button 
            style={styles.filter}
            type="button"
            className={`btn btn${this.state.currentStatus === 'E' ? '' : '-outline'}-success`}
            onClick={ () => { this.changeStatus('E') }}>
            Entregues
          </button>
        </div>
        <div className="input-group" style={styles.dateFilter}>
              <input type="text" 
                  className="form-control"
                  placeholder="01/01/2019"
                  aria-describedby="basic-addon1"
                  value={this.state.currentDate}
                  onChange={this.onDateChange}/>
              <div className="input-group-prepend">
                  <button 
                    className="btn btn-outline-primary" 
                    type="button"
                    onClick={ () => { this.filterByDate() }}>Filtrar</button>
              </div>
          </div>
        
        <div style={styles.listView}>
        <table id="tableClients" className="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Telefone 1</th>
              <th scope="col">Data e hora</th>
              <th scope="col">Bairro</th>
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
              form="orderForm"  
              type="submit" 
              className="btn btn-primary">Confirmação</button>,
            <button key="3" type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>,
          ]}>
          <AddForm 
            client={client} 
            onAddProducts={this.showAddProductsModal}
            products={this.state.currentProducts}
            onRemove={this.removeProduct}
            confirmation={this.confirmarPedido} />
        </Modal>

        <ConfirmationModal
          onCancel={this.showAddModal}
          confirmation={this.state.confirmation} />

        <AddProductModal 
         productsAdded={this.state.currentProducts}
         onFinish={this.onProductsModalFinish}
         onCancel={this.showAddModal}/>

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
