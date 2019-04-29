import React, { Component } from 'react';
import {
  axiosInstance as axios,
  putClientGetData,
  editClient,
} from '../../api';
import { 
  PUT_CLIENTE_GET, 
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
      blackList: 'nao',
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

  onChangeCheckBox = (e) => {
    this.setState({ blackList: e.target.value});
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
      lista_negra: this.state.blackList === 'nao' ? '0' : '1',
      observacao_cliente: this.state.observation,
      data_cadastro: this.state.date ? this.state.date : this.getCurrentDate()
    }

    this.sendClient(client);
    
  }

  sendClient = (client) => {

    let request

    if (this.state.editMode)
      request = axios.post(EDIT_CLIENTE, editClient(client))
    else
      request = axios.post(PUT_CLIENTE_GET, putClientGetData(client))


      console.log(client);

    request.then((response) => {

      try {
        let result = response.data;

        console.log(result);

        if (Array.isArray(result)) {
          const client = result[0];
          this.props.onAddClient(client, 'kGoToDetail');
        } else if (result['status'] === 'ok') {
          const message = this.state.editMode ? 'Cliente atualizado com sucesso!' : 'Cliente adicionado com sucesso!'
          this.props.onAddClient(client, message);
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
      id: '',
      name: '',
      phone: '',
      phone2: '',
      bithday: '',
      blackList: 'nao',
      observation: '',
      date: this.getCurrentDate(),
      editMode: false,
    });
  }

  // Fill the fields and activate edit mode.
  fillFields = (client) => {

    if (client) {
      this.setState({
        id: client.id_cliente,
        name: client.nome_cliente,
        phone: client.telefone1,
        phone2: client.telefone2 == null ? '' : client.telefone2,
        bithday: client.aniversario,
        blackList: client.lista_negra === '0' ? 'nao' : 'sim',
        observation: client.observacao_cliente,
        date: client.data_cadastro ? client.data_cadastro : this.getCurrentDate(),
        editMode: true
      })
    }
  }

  getCurrentDate = () => {

    let d     = new Date(),
        month = '' + (d.getMonth() + 1),
        day   = '' + d.getDate(),
        year  = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');

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
              placeholder="Ex: 1986-01-01"
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
                <input 
                  className="form-check-input" 
                  type="radio"
                  value="nao" 
                  checked={this.state.blackList === 'nao'} 
                  onChange={this.onChangeCheckBox}/>
                <label className="form-check-label" forhtml="inlineRadio1">Não</label>
              </div>
              <div className="form-check form-check-inline">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  value="sim" 
                  checked={this.state.blackList === 'sim'} 
                  onChange={this.onChangeCheckBox}/>
                <label className="form-check-label" forhtml="inlineRadio2">Sim</label>
              </div>
            </div>
          </div>
          
        </form>
      </div>
    )
  }
}

export default Form