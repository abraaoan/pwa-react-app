import React, { Component } from 'react';
import Navbar from '../navbar';
import Toolbar from '../toolbar';
import Modal from '../modal';
import Form from './form';
import Pages from '../pages';
import {
  axiosInstance as axios, 
  getProdutosPaginacaoData as data 
} from '../../api'; 
import { GET_PRODUTO_PAGINACAO } from '../../api/endpoints';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addProducts } from '../../actions';
import queryString from 'query-string';

import Alert from '../alert';

const styles = ({
    tableView: {
      marginLeft: 60,
      marginRight: 60,
      marginTop: 20,
    },
});

class Product extends Component {

  constructor (props) {
    super(props);

    this.state = {
      pagination: [],
      currentPage: 1,
      showAlert: false,
    }

  }

  componentDidMount = () => {

    const queries = queryString.parse(this.props.location.search)
    const paginaAtual = queries.page;
    const newData = data(12, paginaAtual);

    // Request Products
    axios.post(GET_PRODUTO_PAGINACAO, newData)
    .then(response => {

      const result = response.data;
      const pagination = result.pop();
      const apiProducts = result;

      this.props.addProducts(apiProducts);
      this.setState({
        pagination: pagination['paginacao'],
        currentPage: parseInt(queries.page),
      });

      console.log(result);

    }).catch(errors => console.log(errors));
   
  }

  render() {

    const { products } = this.props;

    return (
      <div>
        <Navbar />

        <Alert show={this.state.showAlert} />

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
                <th scope="col">categoria</th>
                <th scope="col">Descrição</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => {
                return(
                  <tr className="test" key={product.id_produto}>
                    <th scope="row">{product.id_produto}</th>
                    <td>{product.nome_produto}</td>
                    <td>{product.tamanho}</td>
                    <td>R$ {product.valor_produto}</td>
                    <td>{product.categoria}</td>
                    <td>{product.descricao_produto.substr(0, 20) + "..."}</td>
                    <td className="hidden" style={{display: 'none'}}>{products.indexOf(product)}</td>
                  </tr>
                );
              } 
                
              )}
            </tbody>
          </table>

          {/* Add and Pagination */}
          <div className="d-flex flex-row justify-content-end">
            <button type="button" 
             className="btn btn-primary mr-auto"
             data-toggle="modal" 
             data-target=".bd-example-modal-lg"
             onClick={() => { 
                this.setState({showAlert: true}) 
                console.log('AQUI', this.state.showAlert);
               }}>Adicionar novo produto</button>
            <Pages pagination={this.state.pagination} currentPage={this.state.currentPage} />  
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addProducts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Product);
