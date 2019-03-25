import React, { Component } from 'react';
import Navbar from '../navbar';
import Toolbar from '../toolbar';
import Modal from '../modal';
import Form from './form';
import Pages from '../pages';
import Json from '../../assets/products.json';

const styles = ({
    tableView: {
      marginLeft: 60,
      marginRight: 60,
      marginTop: 20,
    },
});

export default class Product extends Component {
  constructor() {
    super();

    this.state = {
      products: Json.products,
    };
  }
  render() {
    return (
      <div>
        <Navbar />
        <Toolbar title="Produtos" />
        {/* TableView */}
        <div style={styles.tableView}>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Tamanho</th>
                <th scope="col">Valor</th>
                <th scope="col">Descrição</th>
              </tr>
            </thead>
            <tbody>
              {this.state.products.map(product => {
                return(
                  <tr key={product.id}>
                    <th scope="row">{product.id}</th>
                    <td>{product.nome}</td>
                    <td>{product.tamanho}</td>
                    <td>{product.price}</td>
                    <td>{product.Categoria}</td>
                  </tr>
                );
              } 
                
              )}
            </tbody>
          </table>

          {/* Add and Pagination */}
          <div className="d-flex flex-row justify-content-end">
            <button type="button" className="btn btn-primary mr-auto" data-toggle="modal" data-target=".bd-example-modal-lg">Adicionar novo produto</button>
            <Pages />  
          </div>

        </div>

        <Modal title="Cadastro de produto">
          <Form />
        </Modal>

      </div>
    )
  }
}
