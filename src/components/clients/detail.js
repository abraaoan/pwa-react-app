import React, { Component } from 'react';
import Navbar from '../navbar';
import Toolbar from '../toolbar';
import Modal from '../modal';
import Form from './addressForm';
import Alert from '../alert';
import $ from 'jquery';
import DecisionModal from '../decisionModal';
import { formatDate }  from '../utils';
import { Link } from 'react-router-dom'

//API
import {
  axiosInstance as axios, 
  getClientePorID,
  getClientAddressPorId,
  deleteAddressData,
} from '../../api'; 
import { 
  GET_CLIENTE_ID,
  GET_CLIENTE_ENDERECO,
  DELETE_CLIENTE_ENDERECO
 } from '../../api/endpoints';

const styles = ({
  client: {
    width: '22rem',
    marginLeft: 40,
    marginRight: 0,
    marginTop: 10,
    float: 'left',
  },
  address: {
    width: '22rem',
    marginLeft: 40,
    marginRight: 0,
    marginTop: 10,
    float: 'left',
  },
});

export default class Detail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      client: {},
      addresses: [],
      idCliente: '',
      showAlert: false,
      alertType: 'success', // danger, warning
      alertTitle: 'Endereço adicionado com sucesso!',
      alertMessage: '',
      modalContent: '',
    }

  }

  // Get Client Informations
  getClient = (id) => {

    // Request Client
    axios.post(GET_CLIENTE_ID, getClientePorID(id))
    .then(response => {

      const result = response.data[0];
      
      this.setState({
        client: result,
        idCliente: id,
      });

    }).catch(errors => console.error(errors));

  }

  // Get Client Address
  getClientAddress = (id) => {
    // Request Client
    axios.post(GET_CLIENTE_ENDERECO, getClientAddressPorId(id))
    .then(response => {

      const result = response.data;
      
      this.setState({
        addresses: result,
      });

    }).catch(errors => console.error(errors));

  }

  // Send request to remove address
  sendDeleteProduct = (address) => {

    $('#modalDecision').modal('hide');

    axios.post(DELETE_CLIENTE_ENDERECO, deleteAddressData(address.id_endereco)).then((response) => {

      try {
        let result = response.data;
        if (result['status'] === 'ok') {
          const message = 'Endereço removido com sucesso!'
          this.onAddAddress(address, message);
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

  // Actions

  shouldDeleteAddress = (address) => {

    this.setState({
      modalContent: `${address.id_endereco} - ${address.logradouro}`
    });

    $('#modalDecision').modal()

    $('#decisionModalAction').click(()=>{
      this.sendDeleteProduct(address);
      $('#modalDecision').modal('hide');
    });

  }

  // Delegates

  onAddAddress = (address, message) => {

    this.setState({
      alertTitle: message,
      alertMessage: address.logradouro,
      showAlert: true,
      alertType: 'success'
    });

    // Self close
    setTimeout(() => {
      this.setState({showAlert: false})
    }, 6000); // 6s

    //close modal
    $('#modalProduto').modal('hide')

    this.getClientAddress(address.id_cliente);

  }

  onEdit = (address) => {
    $('#modalProduto').modal()
    this.refs.form.fillFields(address);
  }

  //

  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.getClient(id);
    this.getClientAddress(id);
  }

  render() {
    return (
      <div>
        <Navbar />

        <Alert 
        show={this.state.showAlert} 
        title={this.state.alertTitle} 
        message={`${this.state.alertMessage}.`}
        type={this.state.alertType} />

        <Toolbar
            title="Detalhe do cliente" 
            hRef={process.env.PUBLIC_URL + '/clientes?page=1'}
            linkName="Voltar para clientes"
            shouldHideSearch={true}/>
        <div className="container-fluid">
          <div className="card" style={styles.client}>
          <div className="card-header">
              Informações
            </div>
            <div className="card-body">
              <h5 className="card-title">{`${this.state.client.nome_cliente}`}</h5>
              <p className="card-text">ID: {this.state.client.id_cliente}</p>
              <p className="card-text">Telefone: {this.state.client.telefone1}</p>
              <p className="card-text">Telefone outros: {this.state.client.telefone2 ? this.state.client.telefone2 : 'inexistente'}</p>
              <p className="card-text">Lista negra? <b>{this.state.client.lista_negra === '0' ? 'Não': 'SIM'}</b></p>
              <p className="card-text">Aniversario: {this.state.client.aniversario ? (formatDate(this.state.client.aniversario) === '01/01/2900' ? 'Não informado' : formatDate(this.state.client.aniversario)) : ''}</p>
              
              <Link to={{
                        pathname: process.env.PUBLIC_URL + '/pedidos',
                        search: '?page=1&action=addPedido',
                        client: this.state.client
                      }}
                    style={
                      {marginRight: 20}
                    }>
                        Fazer pedido
                      </Link>

              <button type="button" 
                className="btn btn-primary mr-auto"
                data-toggle="modal" 
                data-target=".bd-example-modal-lg"
                onClick={() => { this.refs.form.clearFields(); }}>Adicionar endereço</button>
            </div>
          </div>

          {
            this.state.addresses.map(address => {
              return (
                <div className="card" style={styles.address} key={ address.id_endereco }>
                  <div className="card-header">
                    Endereço - { address.id_endereco }
                  </div>
                  <div className="card-body">              
                    <p className="card-text">Logradouro: {address.logradouro}</p>
                    <p className="card-text">Bairro: {address.bairro}</p>
                    <p className="card-text">Número: {address.numero}</p>
                    <p className="card-text">CEP: {address.cep}</p>
                    <p className="card-text">Referência: {address.referencia}</p>
                    <p className="card-text">Complemento: {address.complemento}</p>
                    
                    <button type="button" className="btn btn-primary" onClick={() => { this.onEdit(address); }}>
                      Editar
                    </button>

                    <button 
                      type="button" 
                      className="btn btn-danger" 
                      onClick={() => { this.shouldDeleteAddress(address); }}
                      style={{marginLeft: 20}}>
                      Apagar
                    </button>

                  </div>
                </div>
              )
            })
          }

          <Modal 
            title="Cadastro de endereço"
            buttons={[
              <button key="2" type="submit" form="clientAddressForm" className="btn btn-primary">Salvar</button>,
              <button key="3" type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>,
            ]}>

            <Form 
              ref="form"
              onAddAddress={this.onAddAddress}
              idCliente={this.state.idCliente}/>

          </Modal>

          <DecisionModal title="Atenção" actionTitle="Apagar" action={() => { this.sendDeleteAddress(); }}>
            <div>Deseja realmente remover este endereço?</div>
            <strong>{this.state.modalContent}</strong>
          </DecisionModal>

        </div>
      </div>
    )
  }
}
