import React, { Component } from 'react';
import Navbar from '../navbar';
import Toolbar from '../toolbar';
import Modal from '../modal';
import Form from './form';
import Pages from '../pages';
import $ from 'jquery';

import { connect } from 'react-redux';

const styles = ({
    tableView: {
      marginLeft: 60,
      marginRight: 60,
      marginTop: 20,
    },
});

class Product extends Component {

  componentDidMount = () => {

    const products = this.props.products

    // Get tableView click
    $("#tableProducts .test").on('click', function(event){
      event.stopPropagation();
      event.stopImmediatePropagation();
    
      const index =  $(this).find('td[class=hidden]').text();
      console.log(products[index])

    });
  }

  render() {
    const { products } = this.props;

    return (
      <div>
        <Navbar />
        <Toolbar title="Produtos" />
        {/* TableView */}
        <div style={styles.tableView}>
          <table id="tableProducts" className="table table-bordered table-hover">
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
              {products.map(product => {
                return(
                  <tr className="test" key={product.id}>
                    <th scope="row">{product.id}</th>
                    <td>{product.nome}</td>
                    <td>{product.tamanho}</td>
                    <td>{product.price}</td>
                    <td>{product.Categoria}</td>
                    <td className="hidden" style={{display: 'none'}}>{products.indexOf(product)}</td>
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

const mapStateToProps = (store) => ({
  products: store.productState.products
});

export default connect(mapStateToProps)(Product);
