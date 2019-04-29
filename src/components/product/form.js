import React, { Component } from 'react';
import {
  axiosInstance as axios,
  putProdutoData,
  editProdutoData,
} from '../../api';
import { 
  PUT_PRODUTO, 
  EDIT_PRODUTO,
} from '../../api/endpoints';
import Alert from '../alert';

class Form extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      price: '',
      description: '',
      size: '',
      category: '',
      alertType: 'danger', // success, warning
      alertTitle: '',
      alertMessage: '',
      editMode: false,
    }

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);

  }

  onChangeName(e) {
    this.setState({name: e.target.value});
  }

  onChangePrice(e) {
    this.setState({price: (e.target.validity.valid) ? e.target.value : this.state.price});
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

  onError = (message) => {

    console.error(message);

    this.setState({
      alertTitle: '',
      alertMessage: message,
      showAlert: true,
      alertType: 'danger'
    });

    // Self close
    setTimeout(() => {
      this.setState({showAlert: false})
    }, 3000); // 3s

  }

  onSubmit = (e) => {
    e.preventDefault();

    const product = {
      id_produto: this.state.id,
      nome_produto: this.state.name,
      tamanho: this.state.size ? this.state.size : 'Tradicional',
      valor_produto: parseFloat(this.state.price),
      categoria: this.state.category ? this.state.category : 'Torta',
      descricao_produto: this.state.description,
    }

    this.sendProductProduct(product);
    
  }

  sendProductProduct = (product) => {

    let request

    if (this.state.editMode)
      request = axios.post(EDIT_PRODUTO, editProdutoData(product))
    else
      request = axios.post(PUT_PRODUTO, putProdutoData(product))

    request.then((response) => {

      try {
        let result = response.data;
        if (result['status'] === 'ok') {
          const message = this.state.editMode ? 'Produto atualizado com sucesso!' : 'Produto adicionado com sucesso!'
          this.props.onAddProduct(product, message);
          this.clearFields();
        } else {

          // Show alert
          if (result['erro'])
            this.onError(result['erro']);

        }

      } catch(e) {
        console.error(e);
        
        this.onError('Ocorreu um erro desconhecido.');
      }
    });
  }

  clearFields = () => {
    this.setState({
      name: '',
      price: '',
      description: '',
      size: '',
      category: '',
      showAlert: false,
      editMode: false,
    });
  }

  fillFields = (product) => {

    if (product) {

      this.setState({
        id: product.id_produto,
        name: product.nome_produto,
        size: product.tamanho,
        price: product.valor_produto,
        category: product.categoria,
        description: product.descricao_produto,
        editMode: true,

      })
    }
  }

  
  render() {

    return (
      <div>
        <Alert 
          show={this.state.showAlert} 
          title={this.state.alertTitle} 
          message={`${this.state.alertMessage}.`}
          type={this.state.alertType}
          alertStyle={{marginTop: -22}}/>
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
              type="text"
              pattern="[0-9]*" 
              onChange={this.onChangePrice}/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputDescription">Descrição</label>
            <textarea className="form-control"
             id="description"
             rows="3"
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

export default Form
