import React, { Component } from 'react';
import $ from 'jquery';

// ICONS
import Remove from '../../assets/delete';

//API
import {
  axiosInstance as axios, 
  getClientAddressPorId,
  taxData,
} from '../../api'; 
import { 
  GET_CLIENTE_ENDERECO,
  GET_TAXA_ENTREGA
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

export default class AddForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      dateTime: '',
      status: 'A',
      address: {},
      retirada: 'centro',
      addresses: [],
      taxas: [],
      taxa: '',
      client: this.props.client ? this.props.client : {}
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
      retirada: addressIndex
     });
  }

  onChangeRetirada = (e) => {
    this.setState({ 
      retirada: e.target.value,
      address: {},
    });
  }

  onChangeTaxa = (e) => {
    console.log(e.target.value);
    this.setState({ taxa: e.target.value });
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

    const {products} = this.props;

    var total = 0;

    products.forEach(product => {
      total += parseInt(product.valor_produto);
    });

    total += parseInt(this.state.taxa);

    const modalConfirmacao = {
      client: this.state.client,
      dataEntrega: this.state.dateTime,
      dataPedido: this.currentDate(),
      endereco: this.state.address,
      taxa: this.state.taxa,
      products: products,
      total,
    }

    this.props.confirmation(modalConfirmacao);

  }

  // others
  currentDate = () => {
    let d     = new Date(),
          month = '' + (d.getMonth() + 1),
          day   = '' + d.getDate(),
          year  = d.getFullYear();
  
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
  
      return [year, month, day].join('-');
  
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.confirmation();

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
                  Data e hora da entregada:
                </p>
                <div className="col-4">
                <input 
                 className="form-control form-control-sm" 
                 type="text" 
                 placeholder="01/01/2019 14:00" 
                 value={this.state.dateTime}
                 onChange={this.onDateTimeChange}/>
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
                      onChange={this.onChangeTaxa}> 
                      <option value="0" >Selecione</option>
                      {this.state.taxas.map(taxa => {
                        return(
                          <option key={taxa.id_taxa_entrega} value={taxa.valor} >R$ {taxa.valor}</option>
                        );
                      })}
                    </select>
                  </div>
              </div>

              {/* <button
                type="button" 
                className="btn btn-primary"
                data-toggle="tooltip" 
                style={{marginTop: 14}}
                data-placement="bottom" title="Remove produto">
                Adicionar Endereço
              </button> */}
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
                  { products.map(produto => {
                    return(
                      <tr key={produto.id_produto}>
                        <th scope="row" className="data">{produto.id_produto}</th>
                        <td>
                          {produto.nome_produto}
                        </td>
                        <td>
                          R$ {produto.valor_produto}
                        </td>
                        <td>

                          <div id={`kObsPrd${produto.id_produto}`} style={{display: 'none'}} >
                            <input id={`kObsInptPrd${produto.id_produto}`} type="text" placeholder="Observação" />
                            <button type="button" onClick={() => {
                              const value = $(`#kObsInptPrd${produto.id_produto}`).val()
                              produto['obs'] = value;
                              $(`#kObsPrd${produto.id_produto}`).css('display', 'none'); 
                              $(`#kObsLinkPrd${produto.id_produto}`).html(value);
                            }}>Adicionar</button>
                          </div>

                          <button id={`kObsLinkPrd${produto.id_produto}`} style={styles.linkButton} type="button" onClick={() => { 
                            $(`#kObsPrd${produto.id_produto}`).css('display', 'inline'); 
                            $(`#kObsLinkPrd${produto.id_produto}`).html('');
                            }}>
                            {produto.obs ? produto.obj : 'Inserir observação'}
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
      </form>
    )
  }
}
