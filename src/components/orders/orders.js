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
import {formatDateTime} from '../utils';
import Alert from '../alert';
import DecisionModal from '../decisionModal';
import Form from '../clients/addressForm';

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
  getPedidosPorIdCliente,
  editPedidoData,
} from '../../api'; 
import { 
  GET_PEDIDO_PAGINACAO,
  GET_PEDIDO_DATAPEDIDO_PAGINACAO,
  GET_PEDIDO_STATUS_PAG,
  GET_PEDIDO_POR_CLIENTE,
  EDIT_PEDIDO,
} from '../../api/endpoints';

import { convertProducts } from '../utils';

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
      showAlert: false,
      alertType: 'success', // danger, warning
      alertTitle: 'Pedido criado com sucesso!',
      alertMessage: '',
      modalContent: '',
    }

  }

  getPedidos = (status, date, isDtPedido) => {
    const queries = queryString.parse(this.props.location.search)
    const paginaAtual = queries.page;
    const newData = data(6, paginaAtual, date, status);
    var urlParam = status === 'T' ? GET_PEDIDO_PAGINACAO : GET_PEDIDO_STATUS_PAG;

    if (isDtPedido)
      urlParam = GET_PEDIDO_DATAPEDIDO_PAGINACAO;

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

  getPedidosClientes = (idCliente, date) => {
    const newData = getPedidosPorIdCliente(idCliente, date);
    const urlParam = GET_PEDIDO_POR_CLIENTE;

    this.props.addOrders([]);

    // Request Clients
    axios.post(urlParam, newData)
    .then(response => {

      const result = response.data;
      const apiPedidos = result;

      this.props.addOrders(apiPedidos);

    }).catch(errors => console.error(errors));

  }

  changeStatus = (status) => {
    this.getPedidos(status);
    this.setState({ 
      currentStatus: status,
      currentDate: '',
    });
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter')
        this.filterByDate();
  }

  filterByDate = (isDtPedido) => {

    const queries = queryString.parse(this.props.location.search)
    const action = queries.action;

    if (action === 'listPedido') {
      
      const idClient = queries.idClient;

      if (idClient)
        this.getPedidosClientes(idClient, this.state.currentDate, isDtPedido);

    } else {
      this.getPedidos(this.state.currentStatus, this.state.currentDate, isDtPedido);
    }

  }

  navigateToDetail = (idPedido) => {
    const { history } = this.props;
    history.push(`${process.env.PUBLIC_URL}/pedido/${idPedido}`)
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

  showAddAddressModal = () => {
    $('#modalProduto').modal('hide');
    $('#idModalAddress').modal();
  }

  onProductsModalFinish = (products) => {
    this.setState({
      currentProducts: this.state.currentProducts.concat(products)
    });
  }

  onAddAddress = (address, message) => {
    this.onNotification('', message);
    $('#idModalAddress').modal('hide');
    this.refs.addForm.getClientAddress(address.id_cliente);
    $('#modalProduto').modal();
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

  cancelarAlert = (pedido) => {

    this.setState({
      modalContent: `${pedido.pedido.id_pedido} - ${pedido.cliente.nome_cliente}`
    });

    $('#modalDecision').modal()

    $('#decisionModalAction').click(()=>{
      this.cancelarPedido(pedido);
      $('#modalDecision').modal('hide');
    });

  }

  cancelarPedido = (pedido) => {

    const param = {
      id_pedido: pedido.pedido.id_pedido,
      id_cliente: pedido.cliente.id_cliente,
      status: 'C',
      id_endereco: pedido.endereco.id_endereco,
      taxa_entrega: pedido.pedido.taxa_entrega,
      data_pedido: pedido.pedido.data_pedido,
      data_entrega: pedido.pedido.data_entrega,
      produto_valor: pedido.pedido.produto_valor,
      observacao: pedido.pedido.observacao,
      pagamento: pedido.pedido.pagamento,
      pagamento_efetuado: '0',

    }

    axios.post(EDIT_PEDIDO, editPedidoData(param))
    .then(response => {

      //const result = response.data;
      this.getPedidos('T');

    }).catch(errors => console.error(errors));

  }

  onEdit = (pedido) => {

    const products = convertProducts(pedido.pedido.produto_valor);

    this.setState({
      currentProducts: products
    });

    this.refs.addForm.loadFields(pedido);
    $('#modalProduto').modal();

    // Change the title of Confirmation buttton
    $('#idConfirmarPedido').text('Atualizar');

  }

  // ---- Notification ---- //

  onNotification = (title, message, type) => {

    $('#confirmationModal').modal('hide');
    $('#modalProduto').modal('hide');
    $('#idModalAddress').modal('hide');

    this.setState({
      alertTitle: title,
      alertMessage: message,
      showAlert: true,
      alertType: type ? type : 'success'
    });

    // Self close
    setTimeout(() => {
      this.setState({showAlert: false})
    }, 5000); // 5s

    this.getPedidos('T');

  }

  // ---

  componentDidMount = () => {
    
    const queries = queryString.parse(this.props.location.search);
    const action = queries.action;

    if (action === 'addPedido') {
      this.showAddModal();
      this.getPedidos('T');
    } else if (action === 'listPedido') {
      
      const idClient = queries.idClient;

      if (idClient)
        this.getPedidosClientes(idClient);

    } else {
      this.getPedidos('T');
    }
  }

  render() {

    const { orders } = this.props;
    const { client } = this.props.location;

    return (
      <div>
        <Navbar />

        <Alert 
          show={this.state.showAlert} 
          title={this.state.alertTitle} 
          message={`${this.state.alertMessage}.`}
          type={this.state.alertType} />

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
                  onChange={this.onDateChange}
                  onKeyPress={this.onKeyPress}/>
              <div className="input-group-prepend">
                <div className="btn-group" role="group">
                  <button id="btnGroupDrop1" type="button" className="btn btn-outline-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Filtrar
                  </button>
                  <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <button 
                      className="dropdown-item"
                      onClick={ () => { this.filterByDate(false) }}>Data entrega</button> 
                    <button className="dropdown-item"
                      onClick={ () => { this.filterByDate(true) }}>Data pedido</button>
                  </div>
                </div>
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
              {/* <th scope="col">Taxa</th> */}
              <th scope="col" style={{textAlign: 'center'}} >F. Pago</th>
              <th scope="col" style={{textAlign: 'center'}} >Pago?</th>
              <th scope="col">Status</th>
              <th scope="col" colSpan="2"></th>
            </tr>
          </thead>
          <tbody>
            
              {orders.map(order => {
                return(
                  <tr key={order.pedido.id_pedido}>
                    <th scope="row" className="data">{order.pedido.id_pedido}</th>
                    <td onClick={ ()=> this.navigateToDetail(order.pedido.id_pedido) }>
                      {order.cliente.nome_cliente}
                    </td>
                    <td onClick={ ()=> this.navigateToDetail(order.pedido.id_pedido) }>
                      {order.cliente.telefone1}
                    </td>
                    <td onClick={ ()=> this.navigateToDetail(order.pedido.id_pedido) }>
                      {formatDateTime(order.pedido.data_entrega)}
                    </td>
                    <td onClick={ ()=> this.navigateToDetail(order.pedido.id_pedido) }>
                      {order.endereco.bairro}
                    </td>
                    {/* <td onClick={ ()=> this.navigateToDetail(order.pedido.id_pedido) }>
                      R$ {order.pedido.taxa_entrega}
                    </td> */}
                    <td style={{textAlign: 'center'}}>
                      {order.pedido.pagamento ? order.pedido.pagamento === 'C' ? 'Cartão' : 'Dinheiro' : '-'}
                    </td>
                    <td style={{textAlign: 'center'}}>
                      {order.pedido.pagamento_efetuado}
                    </td>
                    
                    <td>
                      <Status value={order.pedido.status} />
                    </td>
                    <td style={{width: 50}}>
                      <button 
                        type="button" 
                        className="btn btn-link" 
                        data-toggle="tooltip" 
                        data-placement="bottom"
                        title="Editar pedido"
                        onClick={ () => { this.onEdit(order) }}
                        disabled={order.pedido.status !== 'A'}>
                        <Edit />
                      </button>
                    </td>
                    <td style={{width: 50}}>
                      <button 
                        type="button" 
                        className="btn btn-link" 
                        data-toggle="tooltip" data-placement="bottom" title="Cancelar pedido"
                        onClick={ () => { this.cancelarAlert(order) }}
                        disabled={order.pedido.status !== 'A'}>
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
            <button 
              id="idConfirmarPedido"
              key="2"
              form="orderForm"  
              type="submit" 
              className="btn btn-primary"
              disabled={this.state.currentProducts.length === 0}>Confirmação</button>,
            <button key="3" type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>,
          ]}>
          <AddForm 
            ref="addForm"
            client={client} 
            onAddProducts={this.showAddProductsModal}
            onAddAddress={this.showAddAddressModal}
            products={this.state.currentProducts}
            onRemove={this.removeProduct}
            confirmation={this.confirmarPedido}
            onNotify={this.onNotification} />
        </Modal>

        <ConfirmationModal
          onCancel={this.showAddModal}
          confirmation={this.state.confirmation} 
          onNotify={this.onNotification}/>

        <AddProductModal 
         productsAdded={this.state.currentProducts}
         onFinish={this.onProductsModalFinish}
         onCancel={this.showAddModal}/>

        <DecisionModal title="Atenção" actionTitle="Cancelar pedido">
          <div>Deseja realmente cancelar esse pedido?</div>
          <strong>{this.state.modalContent}</strong>
        </DecisionModal>

        <Modal id="idModalAddress"
            title="Cadastro de endereço"
            buttons={[
              <button key="2" 
                type="submit" 
                form="clientAddressForm" 
                className="btn btn-primary">Salvar</button>,
              <button key="3" 
                type="button" 
                className="btn btn-secondary" 
                data-dismiss="modal"
                onClick={ ()=> { $('#modalProduto').modal(); }}>Cancelar</button>,
            ]}>

            <Form 
              ref="form"
              onAddAddress={this.onAddAddress}
              idCliente={client ? client.id_cliente : ''}/>

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
