import React, { Component } from 'react';
import Navbar from '../navbar';
import Search from './search';
import Pages from '../pages';
import Modal from '../modal';
import Form from './form';
import $ from 'jquery';
import DecisionModal from '../decisionModal';
import Alert from '../alert';

// APIS
import queryString from 'query-string';
import {
  axiosInstance as axios,
  getClientePaginacaoData as data,
  deleteClienteData,
} from '../../api'; 
import { 
  GET_CLIENTE_PAGINACAO,
  DELETE_CLIENTE,
} from '../../api/endpoints';

// REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addClients } from '../../actions';

// ICONS
import Edit from '../../assets/edit';
import Delete from '../../assets/delete';

const styles = ({
  tableView: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: 20,
  },
});

class Clients extends Component {

  constructor(props){
    super(props);

    this.state = {
      pagination: [],
      clients: [],
      currentPage: 1,
      modalContent: '',
      showAlert: false,
      alertType: 'success', // danger, warning
      alertTitle: 'Endereço adicionado com sucesso!',
      alertMessage: '',
    }

  }

  getClients = () => {
    const queries = queryString.parse(this.props.location.search)
    const paginaAtual = queries.page;
    const newData = data(6, paginaAtual);

    // Request Clients
    axios.post(GET_CLIENTE_PAGINACAO, newData)
    .then(response => {

      const result = response.data;
      const pagination = result.pop();
      const apiClients = result;

      this.props.addClients(apiClients);

      this.setState({
        pagination: pagination['paginacao'],
        currentPage: parseInt(queries.page),
      });

      console.log(pagination);

    }).catch(errors => console.log(errors));

  }

  // When Search Finish
  onSearchFinish = (clients) => {

    this.props.addClients(clients);

    this.setState({
      pagination: [],
      currentPage: 1,
    });

  }

  sendDeleteCliente = (client) => {

    $('#modalDecision').modal('hide');

    axios.post(DELETE_CLIENTE, deleteClienteData(client.id_cliente)).then((response) => {

      console.log('response data: ', response.data);

      try {
        let result = response.data;
        if (result['status'] === 'ok') {
          const message = 'Produto removido com sucesso!'
          this.onAddClient(client, message);
        } else {

          // Show alert
          if (result['erro']) {
            this.setState({
              alertTitle: 'Ops!',
              alertMessage: result['erro'],
              showAlert: true,
              alertType: 'danger'
            });
          }

        }

      } catch(e) {
        console.error(e);
        
        this.setState({
          alertTitle: 'Ops!',
          alertMessage: 'Ocorreu um erro desconhecido.',
          showAlert: true,
          alertType: 'danger'
        });
      }
    });

  }

  // ACTIONS

  navigateToDetail = (id_cliente) => {
    const { history } = this.props;
    history.push(`${process.env.PUBLIC_URL}/cliente/${id_cliente}`)
  }

  onEdit = (client) => {
    $('#modalProduto').modal()
    this.refs.form.fillFields(client);
  }

  shouldDeleteClient = (client) => {

    this.setState({
      modalContent: `${client.id_cliente} - ${client.nome_cliente}`
    });

    $('#modalDecision').modal()

    $('#decisionModalAction').click(()=>{
      this.sendDeleteCliente(client);
      $('#modalDecision').modal('hide');
    });

  }

  // DELEGATE

  onAddClient = (client, message) => {

    if (message === 'kGoToDetail') {

      //close modal
      $('#modalProduto').modal('hide')
      this.navigateToDetail(client.id_cliente);

    } else {

      this.setState({
        alertTitle: message,
        alertMessage: client.nome_cliente,
        showAlert: true,
        alertType: 'success'
      });
  
      // Self close
      setTimeout(() => {
        this.setState({showAlert: false})
      }, 5000); // 5s
  
      //close modal
      $('#modalProduto').modal('hide')
      
      // Get new product
      this.getClients();

    }

  }

  //
  componentDidMount = () => {
    this.getClients();
  }

  render() {

    const { clients } = this.props;

    return (
      <div>
        <Navbar />

        <Alert 
          show={this.state.showAlert} 
          title={this.state.alertTitle} 
          message={`${this.state.alertMessage}.`}
          type={this.state.alertType} />

        <Search 
          title="Clientes" 
          onSearchFinish={this.onSearchFinish}/>

        {/* TableView */}
        <div style={styles.tableView}>
          <table id="tableClients" className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Telefone 1</th>
                <th scope="col">Telefone 2</th>
                <th scope="col" style={{width: 50}}>LN</th>
                <th scope="col" colSpan="4"></th>
              </tr>
            </thead>
            <tbody>
            {clients.map(client => {
                return(

                  <tr key={client.id_cliente}>
                    <th scope="row" className="data">{client.id_cliente}</th>
                    <td onClick={ ()=> this.navigateToDetail(client.id_cliente) }>
                      {client.nome_cliente}
                    </td>
                    <td onClick={ ()=> this.navigateToDetail(client.id_cliente) }>
                      {client.telefone1}
                    </td>
                    <td onClick={ ()=> this.navigateToDetail(client.id_cliente) }>
                      {(client.telefone2) ? client.telefone2 : '-'}
                    </td>
                    <td onClick={ ()=> this.navigateToDetail(client.id_cliente) }>
                      {client.lista_negra === '0' ? 'N' : 'S'}
                    </td>
                    <td style={{width: 50}}>
                      <button 
                        type="button" 
                        className="btn btn-link" 
                        onClick={() => { this.onEdit(client); }}
                        data-toggle="tooltip" data-placement="bottom" title="Editar cliente">
                        <Edit />
                      </button>
                    </td>
                    <td style={{width: 50}}>
                      <button 
                        type="button" 
                        className="btn btn-link" 
                        onClick={() => { this.shouldDeleteClient(client); }}
                        data-toggle="tooltip" data-placement="bottom" title="Apagar cliente">
                        <Delete />
                      </button>
                    </td>
                    <td style={{width: 120}}>
                      Fazer pedido
                    </td>
                    <td style={{width: 130}}>
                      Listar pedidos
                    </td>
                    <td className="hidden" style={{display: 'none'}}>{clients.indexOf(client)}</td>
                  </tr>

                );
              })
            }
            </tbody>
          </table>

          {/* Add and Pagination */}
          <div className="d-flex flex-row justify-content-end">
            <button type="button" 
             className="btn btn-primary mr-auto"
             data-toggle="modal" 
             data-target=".bd-example-modal-lg"
             onClick={() => { this.refs.form.clearFields(); }}>Adicionar novo Cliente</button>
            <Pages path="clientes" pagination={this.state.pagination} currentPage={this.state.currentPage} />  
          </div>

        </div>

        <Modal 
          title="Cadastro de cliente"
          buttons={[
            <button key="2" type="submit" form="clientForm" className="btn btn-primary">Salvar</button>,
            <button key="3" type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>,
          ]}>
          <Form ref="form" onAddClient={this.onAddClient}/>
        </Modal>

        <DecisionModal title="Atenção" actionTitle="Apagar">
          <div>Deseja realmente remover este cliente?</div>
          <strong>{this.state.modalContent}</strong>
        </DecisionModal>

      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  clients: store.clientState.clients
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addClients }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
