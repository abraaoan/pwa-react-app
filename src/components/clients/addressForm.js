import React, { Component } from 'react';
import {
  axiosInstance as axios,
  putAddressData,
  editAddressData,
} from '../../api';
import { 
  PUT_CLIENTE_ENDERECO, 
  EDIT_CLIENTE_ENDERECO,
} from '../../api/endpoints';
import Alert from '../alert';
import $ from 'jquery';

class AddressForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: '',
      id_cliente: '',
      logradouro: '',
      numero: '',
      bairro: '',
      referencia: '',
      complemento: '',
      cep: '',
      editMode: false,

      alertTitle: '',
      alertMessage: '',
      showAlert: false,
      alertType: 'danger'
    }
  }

  // Inputs changes

  onChangeLogradouro = (e) => {
    this.setState({logradouro: e.target.value});
  }

  onChangeNumero = (e) => {
    this.setState({numero: e.target.value});
  }

  onChangeBairro = (e) => {
    this.setState({bairro: e.target.value});
  }

  onChangeReferencia = (e) => {
    this.setState({referencia: e.target.value});
  }

  onChangeComplemento = (e) => {
    this.setState({complemento: e.target.value});
  }

  onChangeCep = (e) => {
    this.setState({cep: (e.target.validity.valid) ? e.target.value : this.state.cep});
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

    const address = {
      id_endereco: this.state.id,
      id_cliente: this.props.idCliente,
      bairro: this.state.bairro,
      cep: this.state.cep,
      complemento: this.state.complemento,
      logradouro: this.state.logradouro,
      numero: this.state.numero,
      referencia: this.state.referencia,
    }

    this.sendClientAddress(address);
    
  }

  sendClientAddress = (address) => {

    let request

    if (this.state.editMode)
      request = axios.post(EDIT_CLIENTE_ENDERECO, editAddressData(address))
    else
      request = axios.post(PUT_CLIENTE_ENDERECO, putAddressData(address))

    request.then((response) => {

      try {
        let result = response.data;
        if (result['status'] === 'ok') {
          const message = this.state.editMode ? 'Endereço atualizado com sucesso!' : 'Endereço adicionado com sucesso!'
          this.props.onAddAddress(address, message);
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
      id_cliente: '',
      logradouro: '',
      numero: '',
      bairro: '',
      referencia: '',
      complemento: '',
      cep: '',
      editMode: false,
    });
  }

  // Fill the fields and activate edit mode.
  fillFields = (address) => {

    if (address) {
      this.setState({
        id: address.id_endereco,
        id_cliente: address.id_cliente,
        logradouro: address.logradouro,
        numero: address.numero,
        bairro: address.bairro,
        referencia: address.referencia,
        complemento: address.complemento,
        cep: address.cep,
        editMode: true,
      })
    }
  }

  componentDidMount = () => {
    
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
        
        <form id="clientAddressForm" style={{padding: 10}} onSubmit={this.onSubmit}>
              <div className="form-group row">
                <div className="col">
                  <label htmlFor="inputNome">Logradouro</label>
                  <input className="form-control"
                  id="logradouro" 
                  placeholder="Ex: Avenida via láctea"
                  value={this.state.logradouro}
                  onChange={this.onChangeLogradouro}/>
                </div>
              </div>
              <div className="form-group row">
                <div className="col">
                  <label htmlFor="inputPhone">Número</label>
                  <div className="input-group">
                    <input className="form-control" 
                    id="numero"
                    placeholder="123"
                    type="text"
                    value={this.state.numero}
                    onChange={this.onChangeNumero}/>
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="inputPhone2">Bairro</label>
                  <div className="input-group">
                    <input className="form-control" 
                    id="bairro"
                    placeholder="Nossa Senhora da Aparecida"
                    type="text"
                    value={this.state.bairro}
                    onChange={this.onChangeBairro}/>
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="col">
                  <label htmlFor="inputNome">Referência</label>
                  <input className="form-control"
                  id="referencia" 
                  placeholder="Ex: Perto da farmacia pague mais"
                  value={this.state.referencia}
                  onChange={this.onChangeReferencia}/>
                </div>
              </div>

              <div className="form-group row">
                <div className="col">
                  <label htmlFor="inputNome">Complemento</label>
                  <input className="form-control"
                  id="complemento" 
                  placeholder="Ex: Conjunto Castelo Branco, Ed. Milano, apto 1104..."
                  value={this.state.complemento}
                  onChange={this.onChangeComplemento}/>
                </div>
              </div>

              <div className="form-group row">
                <div className="col">
                  <label htmlFor="inputNome">CEP</label>
                  <input className="form-control"
                  id="cep" 
                  placeholder="Ex: 69000-000" 
                  value={this.state.cep}
                  onChange={this.onChangeCep}/>
                </div>
              </div>
              
            </form>

      </div>
    )
  }
}

export default AddressForm
