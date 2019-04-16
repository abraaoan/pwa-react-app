import React, { Component } from 'react';
import {
  axiosInstance as axios,
  putClient,
  editClient,
} from '../../api';
import { 
  PUT_CLIENTE, 
  EDIT_CLIENTE,
} from '../../api/endpoints';
import Alert from '../alert';

class Form extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      phone: '',
      phone2: '',
      bithday: '',
      blackList: false,
      observation: '',
      date: '',
      editMode: false,
    }
  }

  // Inputs changes

  onChangeName = (e) => {
    this.setState({name: e.target.value});
  }

  onChangePhone = (e) => {
    this.setState({phone: (e.target.validity.valid) ? e.target.value : this.state.phone});
  }

  onChangePhone2 = (e) => {
    this.setState({phone2: (e.target.validity.valid) ? e.target.value : this.state.phone2});
  }

  onChangeBirthday = (e) => {
    this.setState({bithday: (e.target.validity.valid) ? e.target.value : this.state.bithday});
  }

  //

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

    const client = {
      id_cliente: this.state.id,
      nome_cliente: this.state.name,
      telefone1: this.state.phone,
      telefone2: this.state.phone2,
      aniversario: this.state.bithday,
      lista_negra: this.state.blackList,
      observacao_cliente: this.state.observation,
      data_cadastro: this.state.date
    }

    this.sendClient(client);
    
  }

  sendClient = (client) => {

    let request

    if (this.state.editMode)
      request = axios.post(EDIT_CLIENTE, editClient(client))
    else
      request = axios.post(PUT_CLIENTE, putClient(client))

    request.then((response) => {

      console.log('response data: ', response.data);

      try {
        let result = response.data;
        if (result['status'] === 'ok') {
          const message = this.state.editMode ? 'Cliente atualizado com sucesso!' : 'Cliente adicionado com sucesso!'
          // this.props.onAddProduct(product, message);
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
      id_cliente: '',
      nome_cliente: '',
      telefone1: '',
      telefone2: '',
      aniversario: '',
      lista_negra: false,
      observacao_cliente: '',
      data_cadastro: ''
    });
  }

  // Fill the fields and activate edit mode.
  fillFields = (client) => {

    if (client) {
      this.setState({
        id: client.id_cliente,
        name: client.nome_produto,
        phone: client.telefone1,
        phone2: client.telefone2,
        bithday: client.aniversario,
        blackList: client.lista_negra,
        observation: client.observacao_cliente,
        date: client.data_cadastro,
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
        <form id="clientForm" style={{padding: 10}} onSubmit={this.onSubmit}>
          <div className="form-group row">
            <div className="col">
              <label htmlFor="inputNome">Nome</label>
              <input className="form-control"
              id="nome" 
              placeholder="Ex: João da Silva"
              value={this.state.name}
              onChange={this.onChangeName}/>
             </div>
          </div>
          <div className="form-group row">
            <div className="col">
              <label htmlFor="inputPhone">Telefone1</label>
              <div className="input-group">
                <input className="form-control" 
                id="phone1"
                placeholder="99999-9999"
                type="text"
                pattern="[0-9]*" 
                value={this.state.phone}
                onChange={this.onChangePhone}/>
              </div>
            </div>
            <div className="col">
              <label htmlFor="inputPhone2">Telefone2</label>
              <div className="input-group">
                <input className="form-control" 
                id="phone2"
                placeholder="99999-9999"
                type="text"
                pattern="[0-9]*" 
                value={this.state.phone2}
                onChange={this.onChangePhone2}/>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col">
              <label htmlFor="inputNome">Aniversário</label>
              <input className="form-control"
              id="bithday" 
              placeholder="Ex: 01/01/1986"
              value={this.state.bithday}
              onChange={this.onChangeBirthday}/>
             </div>
          </div>

          <div className="form-group row">
            <div className="col-md-2">
              <label htmlFor="inputNome">Lista negra:</label>
            </div>
            <div className="col">
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                <label className="form-check-label" for="inlineRadio1">Não</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                <label className="form-check-label" for="inlineRadio2">Sim</label>
              </div>
            </div>
          </div>
          
        </form>
      </div>
    )
  }
}

export default Form
