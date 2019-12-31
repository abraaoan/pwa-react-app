import React, { Component } from 'react';
import Navbar from '../navbar';
import Search from './search';
import Modal from '../modal';
import DecisionModal from '../decisionModal';
import Form from './form';
import Pages from '../pages';
import {
  axiosInstance as axios, 
  getProdutosPaginacaoData as data,
  deleteProdutoData
} from '../../api'; 
import { GET_PRODUTO_PAGINACAO, DELETE_PRODUTO } from '../../api/endpoints';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addProducts } from '../../actions';
import queryString from 'query-string';
import Alert from '../alert';
import $ from 'jquery';

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

class Product extends Component {

  constructor (props) {
    super(props);

    this.state = {
      pagination: [],
      currentPage: 1,
      showAlert: false,
      alertType: 'success', // danger, warning
      alertTitle: 'Produto adicionado com sucesso!',
      alertMessage: '',
      modalContent: '',
    }
  }

  componentDidMount = () => {
    this.getProducts()
  }

  getProducts = () => {
    const queries = queryString.parse(this.props.location.search)
    const paginaAtual = queries.page;
    const newData = data(25, paginaAtual);

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

    }).catch(errors => console.error(errors));

  }

  sendDeleteProduct = (product) => {

    $('#modalDecision').modal('hide');

    axios.post(DELETE_PRODUTO, deleteProdutoData(product.id_produto)).then((response) => {

      try {
        let result = response.data;
        if (result['status'] === 'ok') {
          const message = 'Produto removido com sucesso!'
          this.onAddProduct(product, message);
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

  onAddProduct = (product, message) => {

    this.setState({
      alertTitle: message,
      alertMessage: product.nome_produto,
      showAlert: true,
      alertType: 'success'
    });

    // Self close
    setTimeout(() => {
      this.setState({showAlert: false})
    }, 6000); // 6s

    //close modal
    $('#modalProduto').modal('hide')
    
    // Get new product
    this.getProducts();

  }

  onEdit = (product) => {
    $('#modalProduto').modal()
    this.refs.form.fillFields(product);
  }

  shouldDeleteProduct = (product) => {

    this.setState({
      modalContent: `${product.id_produto} - ${product.nome_produto}`
    });

    $('#modalDecision').modal()

    $('#decisionModalAction').click(()=>{
      this.sendDeleteProduct(product);
      $('#modalDecision').modal('hide');
    });

  }

  onSearchFinish = (products) => {

    this.props.addProducts(products);

    this.setState({
      pagination: [],
      currentPage: 1,
    });

  }

  render() {

    const { products } = this.props;

    return (
      <div>
        <Navbar />

        <Alert 
        show={this.state.showAlert} 
        title={this.state.alertTitle} 
        message={`${this.state.alertMessage}.`}
        type={this.state.alertType} />

        <Search 
          title="Produtos" 
          onSearchFinish={this.onSearchFinish}/>
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
                <th scope="col" colSpan="3">Descrição</th>
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
                    <td style={{width: 50}}>
                      <button type="button" className="btn btn-link" onClick={() => { this.onEdit(product); }}>
                        <Edit />
                      </button>
                    </td>
                    <td style={{width: 50}}>
                      <button type="button" className="btn btn-link" onClick={() => { this.shouldDeleteProduct(product); }}>
                        <Delete />
                      </button>
                    </td>
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
             onClick={() => { this.refs.form.clearFields(); }}>Adicionar novo produto</button>
            <Pages path="produtos" pagination={this.state.pagination} currentPage={this.state.currentPage} />  
          </div>

        </div>

        <Modal 
          title="Cadastro de produto"
          buttons={[
            <button key="0" type="submit" form="productForm" className="btn btn-primary">Salvar</button>,
            <button key="1" type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>,
          ]}>
          <Form 
            ref="form"
            onAddProduct={this.onAddProduct}
            onAddProductError={this.onAddProductError}
            product={this.state.product} />
        </Modal>

        <DecisionModal title="Atenção" actionTitle="Apagar" action={() => { this.sendDeleteProduct(); }}>
          <div>Deseja realmente remover este produto?</div>
          <strong>{this.state.modalContent}</strong>
        </DecisionModal>

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
