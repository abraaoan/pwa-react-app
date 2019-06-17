import React, { Component } from 'react';
import $ from 'jquery';
import { 
  currentDateTime,
  formatDateTime, 
  unformatDateTime,
  isValidDate
 } from '../utils';

// ICONS
import Remove from '../../assets/delete';

//API
import {
  axiosInstance as axios, 
  getClientAddressPorId,
  taxData,
  editPedidoData
} from '../../api'; 
import { 
  GET_CLIENTE_ENDERECO,
  GET_TAXA_ENTREGA,
  EDIT_PEDIDO
 } from '../../api/endpoints';

 // Styles
const styles = ({
  listView: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: 20,
  },
  cards: {
    marginTop: 10
  },
  linkButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
    display: 'inline',
    margin: 0,
    padding: 0,
  }
});

const isOnDevMode = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');

const centro = {
  bairro: 'Centro',
  cep: '69020-030',
  complemento: '',
  id_cliente: isOnDevMode ? '31' : '27', //Change when production
  id_endereco: isOnDevMode ? '11' : '13', //Change when production
  logradouro: 'Av. Joaquim Nabuco',
  numero: '1180',
  referencia: '',
}

const vieralves = {
  bairro: 'Vieiralves',
  cep: '69053-050',
  complemento: '',
  id_cliente: isOnDevMode ? '31' : '27', //Change when production
  id_endereco: isOnDevMode ? '12' : '14', //Change when production
  logradouro: 'Rua Rio Purús',
  numero: '660',
  referencia: '',
}

export default class AddForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      dateTime: '',
      status: 'A',
      address: centro,
      retirada: 'centro',
      addresses: [],
      taxas: [],
      taxa: '0',
      observacao: '',
      client: this.props.client ? this.props.client : {},
      editMode: false,
      formaPagamento: 'D',
      pedido: {},
      taxaEnable: false,
    }
    
  }

  onDateTimeChange = (e) => {
    if (e.target.value.match("(^[0-9\\s//:]*$)") != null) {
      this.setState( { dateTime: e.target.value });
    }
  }

  onChangeAddresses = (e) => {

    const addressIndex = e.target.value;
    const address = this.state.addresses[addressIndex];

    this.setState({
      address,
      retirada: addressIndex,
      taxaEnable: true,
     });
  }

  onChangeRetirada = (e) => {
    this.setState({ 
      retirada: e.target.value,
      address: e.target.value === 'centro' ? centro : vieralves,
      taxa: '0',
      taxaEnable: false,
    });
  }

  onChangeTaxa = (e) => {
    this.setState({ taxa: e.target.value });
  }

  onChangeObservacao = (e) => {
    this.setState({ observacao: e.target.value });
  }

  onFormaPagtoChange = (e) => {
    this.setState({ formaPagamento: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.confirmation();
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

  //
  getTaxas = () => {

    axios.post(GET_TAXA_ENTREGA, taxData())
    .then(response => {

      const result = response.data;
      
      this.setState({
        taxas: result,
      });

    }).catch(errors => console.error(errors));
  }

  confirmation = () => {

    if (!isValidDate(this.state.dateTime)) {
      alert('Data deve ser maior que a data atual.');
      return;
    }

    const { products } = this.props;

    var total = 0;

    products.forEach(product => {
      total += parseInt(product.valor_produto);
    });

    total += parseInt(this.state.taxa);

    const modalConfirmacao = {
      client: this.state.client,
      dataEntrega: this.state.dateTime,
      dataPedido: currentDateTime(),
      endereco: this.state.address,
      taxa: this.state.taxa,
      products: products,
      total,
      pagamento: this.state.formaPagamento,
      observacao: this.state.observacao,
    }

    if (this.state.editMode) {
      this.sendData(modalConfirmacao);
    } else {
      this.props.confirmation(modalConfirmacao);
    }

  }

  clearFields = () => {
    this.setState({
      dateTime: '',
      status: 'A',
      address: {},
      retirada: 'centro',
      addresses: [],
      taxas: [],
      taxa: '',
      observacao: '',
      client: this.props.client ? this.props.client : {},
      formaPagamento: 'D',
      editMode: false
    });
  }

  loadFields = (pedido) => {

    this.getClientAddress(pedido.cliente.id_cliente);

    this.setState({
      dateTime: formatDateTime(pedido.pedido.data_entrega, true),
      status: pedido.pedido.status,
      address: pedido.endereco,
      retirada: pedido.endereco.id_endereco ? pedido.endereco.id_endereco : 'centro',
      taxa: pedido.pedido.taxa_entrega,
      observacao: pedido.pedido.observacao,
      client: pedido.cliente,
      formaPagamento: pedido.pedido.pagamento ? pedido.pedido.pagamento : 'D',
      editMode: true,
      pedido
    });
  }

  // Only when editMode
  sendData = (confirmation) => {

    const client = confirmation.client ? confirmation.client : null;
    const products = confirmation.products ? confirmation.products : null;
    const address = confirmation.endereco ? confirmation.endereco: null;

    if (!client | !address | !products)
      return

    var param = {
      id_pedido: this.state.pedido.pedido.id_pedido,
      id_cliente: client.id_cliente,
      status: 'A',
      id_endereco: address.id_endereco,
      taxa_entrega: confirmation.taxa ? confirmation.taxa : 0,
      data_pedido: currentDateTime(),
      data_entrega: unformatDateTime(confirmation.dataEntrega ? confirmation.dataEntrega : null),
      observacao: confirmation.observacao ? confirmation.observacao : '',
      pagamento: this.state.formaPagamento,
      pagamento_efetuado: '0',
      
    }

    var valor_produto = "";

    for (var i = 0; i < products.length; i++ ) {
      const product = products[i];
      valor_produto += `${product.id_produto}:`;
      valor_produto += `${product.nome_produto}:`;
      valor_produto += `${product.tamanho}:`;
      valor_produto += `${product.valor_produto}:`;
      valor_produto += `${product.obs ? product.obs : ''}//`;
    }

    param['produto_valor'] = valor_produto;

    axios.post(EDIT_PEDIDO, editPedidoData(param))
    .then(response => {

      try {

        const result = response.data;

        if (result['status'] === 'ok' || result === '{\'status\':\'ok\'}') {
          this.props.onNotify('', 'Pedido Atualizado com sucesso');
        } else {
          alert('OPS!');
        }

      } catch(errors) {
        console.error(errors);
      }

    }).catch(errors => console.error(errors));
  }

  componentDidMount = () => {

    if (this.state.client)
      this.getClientAddress(this.state.client.id_cliente);

    this.getTaxas();
  }

  render() {

    const {products} = this.props;

    return (
      <form id="orderForm" onSubmit={this.onSubmit}>
          {/* Cliente */}
          <div className="card" style={styles.cards}>
            <div className="card-header">
              Cliente
            </div>
            <div className="card-body container">
              <div className="row">
                <p className="col-4 card-text">Nome: <span style={{color: 'rgba(0, 0, 0, 0.7)'}}>{this.state.client.nome_cliente}</span> </p>
                <p className="col card-text">Telefone: <span style={{color: 'rgba(0, 0, 0, 0.7)'}}>{this.state.client.telefone1}</span></p>
              </div>
              <div className="row">
                <p className="col-4 card-text">
                  Data e hora da entrega:
                </p>
                <div className="col-4">
                <input 
                 className="form-control form-control-sm" 
                 type="text" 
                 placeholder="01/01/2019 14:00" 
                 value={this.state.dateTime}
                 onChange={this.onDateTimeChange} required={true}/>
                </div>
              </div>
            </div>
          </div>
          {/* Endereço */}
          <div className="card" style={styles.cards}>
            <div className="card-header">
              Endereço
            </div>
            <div className="card-body">

              <div className="row">
                <p className="card-text col-5">Local de entrega</p>
                <p className="card-text col">Retirada na loja</p>
                <p className="card-text col-3">Taxa de entrega</p>
              </div>
              <div className="row">
                <div className="col-5">
                  
                  {this.state.addresses.map(address => {
                    return (
                      
                      <div className="row" key={address.id_endereco}>
                        <div className="form-check col-6" style={{ marginLeft: 14}}>
                          <input 
                            className="form-check-input" 
                            type="radio" 
                            name="delivery" 
                            id={`delivery${address.id_endereco}`}
                            value={this.state.addresses.indexOf(address)}
                            checked={this.state.address.id_endereco === address.id_endereco} 
                            onChange={this.onChangeAddresses} />
                          <label className="form-check-label" htmlFor={`delivery${address.id_endereco}`}>
                          { `${address.bairro} nº ${address.numero}`}
                          </label>
                        </div>
                        
                      </div>

                    );
                  })}

                </div>
                <div className="col">
                  <div className="form-check">
                    <input 
                     className="form-check-input" 
                     type="radio" 
                     name="retirada" 
                     id="retirada1" 
                     value="centro"
                     checked={this.state.retirada === 'centro'} 
                     onChange={this.onChangeRetirada}  
                     />
                    <label className="form-check-label" htmlFor="retirada1">
                      Centro
                    </label>
                  </div>
                  <div className="form-check">
                    <input 
                     className="form-check-input"
                     type="radio" name="retirada" 
                     id="retirada2" 
                     value="vieralves" 
                     checked={this.state.retirada === 'vieralves'} 
                     onChange={this.onChangeRetirada} />
                    <label className="form-check-label" htmlFor="retirada2">
                      Vieralves
                    </label>
                  </div>
                </div>
                <div className="col-3">
                    <select 
                      className="form-control"
                      value={this.state.taxa} 
                      onChange={this.onChangeTaxa}
                      disabled={!this.state.taxaEnable}
                      > 
                      <option value="0" >Selecione</option>
                      {this.state.taxas.map(taxa => {
                        return(
                          <option key={taxa.id_taxa_entrega} value={taxa.valor} >R$ {taxa.valor}</option>
                        );
                      })}
                    </select>
                  </div>
              </div>

              <button
                type="button" 
                className="btn btn-primary"
                data-toggle="tooltip" 
                style={{marginTop: 14}}
                data-placement="bottom" title="Remove produto"
                onClick={this.props.onAddAddress}>
                Adicionar Endereço
              </button>
            </div>
          </div>

          {/* Produtos */}
          <div className="card" style={styles.cards}>
            <div className="card-header">
              Produtos
            </div>
            <div className="card-body">
              <table id="tableClients" className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item</th>
                    <th scope="col">Valor</th>
                    <th scope="col" colSpan="2">Observação</th>
                  </tr>
                </thead>
                <tbody>
                  { products.map((produto, index) => {
                    return(
                      <tr key={produto.id_produto + index}>
                        <th scope="row" className="data">{produto.id_produto}</th>
                        <td>
                          {produto.nome_produto}
                        </td>
                        <td>
                          R$ {produto.valor_produto}
                        </td>
                        <td style={{width: 300}}>

                          <div id={`kObsPrd${produto.id_produto + index}`} style={{display: 'none', width: 240}} className="input-group" >
                            <input id={`kObsInptPrd${produto.id_produto + index}`} style={{width: 160, float: 'left'}} className="form-control form-control-sm" type="text" placeholder="Observação" />
                            <div class="input-group-append" style={{width: 80, float: 'left'}}>
                              <button type="button" className="btn btn-primary btn-sm" onClick={() => {
                                const value = $(`#kObsInptPrd${produto.id_produto + index}`).val()
                                products[index]['obs'] = value;
                                $(`#kObsPrd${produto.id_produto + index}`).css('display', 'none'); 
                                $(`#kObsLinkPrd${produto.id_produto + index}`).html(value);
                              }}>Adicionar</button>
                            </div>
                          </div>

                          <button id={`kObsLinkPrd${produto.id_produto + index}`} 
                            style={styles.linkButton} 
                            type="button"
                            onClick={() => { 

                            $(`#kObsPrd${produto.id_produto + index}`).css('display', 'inline'); 
                            $(`#kObsLinkPrd${produto.id_produto + index}`).html('');

                            }}>
                            {produto.obs ? produto.obs : 'Inserir observação'}
                          </button>
                        </td>
                        <td style={{width: 50}}>
                          <button 
                            type="button" 
                            className="btn btn-link" 
                            data-toggle="tooltip" 
                            data-placement="bottom" 
                            title="Remove produto"
                            onClick={ () => {
                              this.props.onRemove(produto);
                            }}>
                            <Remove />
                          </button>
                        </td>
                      </tr> 
                    );
                  }) } 
                </tbody>
              </table>
              <button 
                type="button" 
                className="btn btn-primary"
                data-toggle="tooltip" 
                data-placement="bottom"
                title="Adicionar produtos"
                onClick={ () => { this.props.onAddProducts(); }}>
                Adicionar
              </button>
            </div>
          </div>
          {/* Observaçao */}
          <div className="card" style={styles.cards}>
              <div className="card-header">
                Observação
              </div>
              <div className="card-body container">
                <div className="row">
                  <textarea 
                    className="form-control"
                    placeholder="Insira uma observação"
                    id="idObservacao" 
                    rows="3"
                    value={this.state.observacao}
                    onChange={this.onChangeObservacao}></textarea>
                </div>
              </div>
            </div>
            {/* Forma de pagamento */}
          <div className="card" style={styles.cards}>
              <div className="card-header">
                Forma de pagamento
              </div>
              <div className="card-body container">
                <div className="row">
                  <div className="col-5">
                    <label>Escolha uma forma de pagamento:</label>
                  </div>
                  <div className="col-2">
                    <input 
                     className="form-check-input" 
                     type="radio" 
                     value="D" 
                     id="idDinheiro"
                     checked={this.state.formaPagamento === 'D'}
                     onChange={this.onFormaPagtoChange}/>
                    <label className="form-check-label" htmlFor="idDinheiro">
                      Dinheiro
                    </label>
                  </div>
                  <div className="col-2">
                    <input
                     className="form-check-input"
                     type="radio" 
                     value="C" 
                     id="idCartao"
                     checked={this.state.formaPagamento === 'C'}
                     onChange={this.onFormaPagtoChange}/>
                    <label className="form-check-label" htmlFor="idCartao">
                      Cartão
                    </label>
                  </div>
                </div>
              </div>
            </div>
      </form>
    )
  }
}
