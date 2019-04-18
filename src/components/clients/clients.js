import React, { Component } from 'react';
import Navbar from '../navbar';
import Search from './search';
import Pages from '../pages';
import Modal from '../modal';
import Form from './form';
import $ from 'jquery';

// APIS
import queryString from 'query-string';
import {
  axiosInstance as axios,
  getClientePaginacaoData as data,
} from '../../api'; 
import { GET_CLIENTE_PAGINACAO } from '../../api/endpoints';

// REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addClients } from '../../actions';

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
    }

  }

  getClients = () => {
    const queries = queryString.parse(this.props.location.search)
    const paginaAtual = queries.page;
    const newData = data(8, paginaAtual);

    // Request Products
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

  componentDidMount = () => {
    this.getClients();

    

  }

  render() {

    const { clients } = this.props;

    // Get tableView click
    $("#tableClients .clientRow").on('click', function(event){
      event.stopPropagation();
      event.stopImmediatePropagation();
    
      const index =  $(this).find('td[class=hidden]').text();
      const client = clients[index];
      console.log(client);

    });

    return (
      <div>
        <Navbar />

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
                <th scope="col" colSpan="3"></th>
              </tr>
            </thead>
            <tbody>
            {clients.map(client => {
                return(

                  <tr className="clientRow" key={client.id_cliente}>
                    <th scope="row">{client.id_cliente}</th>
                    <td>{client.nome_cliente}</td>
                    <td>{client.telefone1}</td>
                    <td>{(client.telefone2) ? client.telefone2 : '-'}</td>
                    <td>{client.lista_negra === '0' ? 'N' : 'S'}</td>
                    <td style={{width: 50}}>
                      Edit
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
             data-target=".bd-example-modal-lg">Adicionar novo Cliente</button>
            <Pages path="clientes" pagination={this.state.pagination} currentPage={this.state.currentPage} />  
          </div>

        </div>

        <Modal 
          title="Cadastro de cliente"
          buttons={[
            <button key="1" type="submit" className="btn btn-primary">Cadastrar endereço</button>,
            <button key="2" type="submit" form="clientForm" className="btn btn-primary">Salvar</button>,
            <button key="3" type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>,
          ]}>
          <Form ref="form"/>
        </Modal>

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
