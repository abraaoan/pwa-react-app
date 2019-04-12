import React, { Component } from 'react';
import Navbar from '../navbar';
import Search from './search';
import Pages from '../pages';
import {
  axiosInstance as axios, 
} from '../../api'; 
import { GET_PRODUTO_PAGINACAO, DELETE_PRODUTO } from '../../api/endpoints';

const styles = ({
  tableView: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: 20,
  },
});

export default class Clients extends Component {

  constructor(props){
    super(props);

    this.state = {
      pagination: [],
      currentPage: 1,
    }

  }

  render() {
    return (
      <div>
        <Navbar />

        <Search 
          title="Clientes" 
          onSearchFinish={this.onSearchFinish}/>

        {/* TableView */}
        <div style={styles.tableView}>
          <table id="tableProducts" className="table table-bordered table-hover">
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
              <tr className="test" >
                <th scope="row">0</th>
                <td>Appleseed</td>
                <td>99999999</td>
                <td>-</td>
                <td>n</td>
                <td style={{width: 50}}>
                  Edit
                </td>
                <td style={{width: 120}}>
                  Fazer pedido
                </td>
                <td style={{width: 130}}>
                  Listar pedidos
                </td>
              </tr>
            </tbody>
          </table>

          {/* Add and Pagination */}
          <div className="d-flex flex-row justify-content-end">
            <button type="button" 
             className="btn btn-primary mr-auto"
             data-toggle="modal" 
             data-target=".bd-example-modal-lg" 
             onClick={() => { this.refs.form.clearFields(); }}>Adicionar novo produto</button>
            <Pages pagination={this.state.pagination} currentPage={this.state.currentPage} />  
          </div>

        </div>

      </div>
    )
  }
}