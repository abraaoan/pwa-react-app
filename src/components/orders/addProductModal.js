import React, { Component } from 'react';
import $ from 'jquery';

// API
import {
  axiosInstance as axios, 
  getProdutosPorNomeData
} from '../../api'; 
import { GET_PRODUTO_POR_NOME } from '../../api/endpoints';

class AddProductModal extends Component {

  constructor(props){
    super(props);

    this.state = {
      term: '',
      products: [],
      productsToSave: props.productsAdded
    }

  }

  onSearch = () => {

    if (!this.state.term)
      return;

    axios.post(GET_PRODUTO_POR_NOME, getProdutosPorNomeData(this.state.term)).then((response) => {
      const products = response.data;

      this.setState({
        products
      });
    });
  }

  onChangeTerm = (e) => {
    this.setState({term: e.target.value});
  }

  onKeyPress = (e) => {
      if (e.key === 'Enter')
          this.onSearch();
  }

  onSelectProduct = (product) => {

    var all = [...this.state.productsToSave];
    var index = all.indexOf(product);

    if (index !== -1) {
      all.splice(index, 1);
      this.setState({
        productsToSave: all
      });
    } else {
      this.setState(prevState => ({
        productsToSave: [...prevState.productsToSave, product]
      }))
    }
  }

  add = () => {
    $('#addProductModal').modal('hide');
    $('#modalProduto').modal();
    this.props.onFinish(this.state.productsToSave);
  }

  render() {
    return (
      <div>
        <div id="addProductModal" className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Adicionar produtos</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div id="searchToolBar" >
                  <div className="input-group" style={{width: 400, marginRight:-18}}>
                    <input type="text" 
                        className="form-control"
                        placeholder={`Busque os produtos aqui`}
                        aria-label="Username" 
                        aria-describedby="basic-addon1" 
                        value={this.state.term}
                        onChange={this.onChangeTerm}
                        onKeyPress={this.onKeyPress}/>
                    <div className="input-group-prepend">
                        <button className="btn btn-outline-primary" type="button" onClick={()=>{this.onSearch()}}>Buscar</button>
                    </div>
                  </div>
                </div>
                {/* tableView */}
                <table id="tableProducts" className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Item</th>
                      <th scope="col">Tamanho</th>
                      <th scope="col" colSpan="2">Valor</th>
                    </tr>
                  </thead>
                  <tbody>

                    {this.state.products.map(product => {
                      return (
                        <tr key={product.id_produto}>
                          <th scope="row">{product.id_produto}</th>
                          <td>{product.nome_produto}</td>
                          <td>{product.tamanho}</td>
                          <td>R$ {product.valor_produto}</td>
                          <td>
                            <input 
                              style={{marginLeft: 3}}
                              className="form-check-input"
                              type="checkbox"
                              id={`check${product.id_produto}`}
                              defaultChecked={this.state.productsToSave.indexOf(product) !== -1}
                              onClick={ () => { this.onSelectProduct(product); }}/>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button 
                key="2" 
                type="button" 
                className="btn btn-primary"
                disabled={ this.state.productsToSave.length === 0 }
                onClick={ () => { this.add() } }>
                Adicionar
                </button>
                <button 
                  key="3" 
                  type="button" 
                  className="btn btn-secondary" 
                  data-dismiss="modal"
                  onClick={ () => { this.props.onCancel(); }}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddProductModal
