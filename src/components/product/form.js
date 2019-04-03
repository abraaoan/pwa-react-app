import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addProduct } from '../../actions';

import {axiosInstance as axios, putProdutoData as data} from '../../api';
import { PUT_PRODUTO } from '../../api/endpoints';

class Form extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      price: '',
      description: '',
      size: '',
      category: '',
      isSending: false,
    }

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);

  }

  onChangeName(e) {
    this.setState({name: e.target.value});
  }

  onChangePrice(e) {
    this.setState({price: e.target.value});
  }

  onChangeDescription(e) {
    this.setState({description: e.target.value});
  }

  onChangeSize = (e) => {
    this.setState({size: e.target.value});
  }

  onChangeCategory = (e) => {
    this.setState({category: e.target.value});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const product = {
      nome_produto: this.state.name,
      tamanho: this.state.size ? this.state.size : 'Tradicional',
      valor_produto: parseFloat(this.state.price),
      categoria: this.state.category ? this.state.category : 'Torta',
      descricao_produto: this.state.description,
    }

    this.setState({ isSending: true });

    axios.post(PUT_PRODUTO, data(product)).then((response) => {
      this.setState({ isSending: false });
      console.log(response);
    });

    console.log(product);

  }
  
  render() {

    return (
      <div>
        <form id="productForm" style={{padding: 10}} onSubmit={this.onSubmit}>
          <div className="form-group row">
            <label htmlFor="inputNome">Nome</label>
            <input className="form-control"
             id="nome" 
             placeholder="Ex: Torta de limão" 
             value={this.state.name}
             onChange={this.onChangeName}/>
          </div>
          <div className="form-group row">
            <label htmlFor="inputPrice">Preço</label>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">R$</div>
              </div>
              <input className="form-control" 
              id="price"
              placeholder="Ex: 120,00" 
              value={this.state.price}
              onChange={this.onChangePrice}/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputDescription">Descrição</label>
            <input className="form-control"
             id="description" 
             placeholder="Ex: Torta feita com suco de limão batido com leite condensado..." 
             value={this.state.description}
             onChange={this.onChangeDescription}/>
          </div>
          <div className="form-group row">
            <div className="form-row">
              <div className="col-6">
                <label htmlFor="inputState">Tamanho</label>
                <select id="inputState" 
                className="form-control" 
                value={this.state.size} 
                onChange={this.onChangeSize}>
                  <option value="Mini">Mini</option>
                  <option value="Baby">Baby</option>
                  <option value="Pequeno">Pequeno</option>
                  <option value="Medio">Medio</option>
                  <option value="Grande">Grande</option>
                  <option value="Extra Grande">Extra Grande</option>
                  <option value="Pirex Oval">Pirex Oval</option>
                  <option value="Pirex Retangula">Pirex Retangula</option>
                  <option value="Tradicional">Tradicional</option>
                </select>
              </div>
              <div className="col-6">
                <label htmlFor="inputState">Categoria</label>
                <select id="inputState" 
                className="form-control" 
                value={this.state.category} 
                onChange={this.onChangeCategory}>
                  <option value="Americano">Americano</option>
                  <option value="Bola">Bola</option>
                  <option value="Bolo">Bolo</option>
                  <option value="Casquinha">Casquinha</option>
                  <option value="Conde">Conde</option>
                  <option value="Pao de lo">Pão de lo</option>
                  <option value="Pave">Pave</option>
                  <option value="Salgada">Salgada</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addProduct }, dispatch);

export default connect(null, mapDispatchToProps)(Form)
