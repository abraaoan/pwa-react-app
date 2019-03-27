import React, { Component } from 'react';
import { Store } from '../../store/index';


export default class Form extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      price: '',
      description: '',
      size: '',
      category: ''
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

    const newProduct = {
      id: "0123",
      name: this.state.name,
      price: this.state.price,
      description: this.state.description,
      size: this.state.size,
      category: this.state.category
    }

    Store.dispatch({type: 'ADD_PRODUCT', product: newProduct});

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
                  <option value="0">Grande</option>
                  <option value="1">Médio</option>
                  <option value="2">Pequena</option>
                </select>
              </div>
              <div className="col-6">
                <label htmlFor="inputState">Categoria</label>
                <select id="inputState" 
                className="form-control" 
                value={this.state.category} 
                onChange={this.onChangeCategory}>
                  <option value="1">Torta</option>
                  <option value="2">Reta</option>
                  <option value="3">Perpendicular</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
