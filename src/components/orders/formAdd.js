import React, { Component } from 'react';

// ICONS
import Status from './status';
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

const styles = ({
  listView: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: 20,
  },
  cards: {
    marginTop: 10
  }
});

export default class AddForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      dateTime: '',
      status: 'A',
      addressId: '0',
      frete: 0,
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

  onChangeFrete = (e) => {
    this.setState({frete: e.target.value});
  }

  onChangeAddresses = (e) => {
    this.setState({ addressId: e.target.value});
  }

  onChangeRetirada = (e) => {
    this.setState({ retirada: e.target.value});
  }

  onChangeTaxa = (e) => {
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
    
    var confirmation = {
      id_cliente: this.state.client.id_cliente,
      status: this.state.status,
      id_endereco: this.addressId,
      taxa_entrega: this.state.taxa, //
      data_pedido: this.currentDate(),
      data_entrega: this.state.dateTime,
      produto_valor: this.state.price,//
      observacao: this.state.observacao,
      pagamento: this.state.pagamento
    }

    console.log(confirmation);

    const {products} = this.props;

    const modalConfirmacao = {
      nome: this.state.client.nome_cliente,
      entrega: this.state.dateTime,
      endereco: this.state.addressId,
      taxa: this.state.taxa,
      products: products
    }

    console.log(modalConfirmacao)

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

  componentDidMount = () => {

    if (this.state.client)
      this.getClientAddress(this.state.client.id_cliente);

    this.getTaxas();
  }

  render() {

    const {products} = this.props;

    return (
      <div>
          {/* Cliente */}
          <div className="card" style={styles.cards}>
            <div className="card-header">
              Cliente
            </div>
            <div className="card-body container">
              <div className="row">
                <p className="col-4 card-text">Nome: {this.state.client.nome_cliente}</p>
                <p className="col card-text">Telefone: {this.state.client.telefone1}</p>
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
              <div className="row">
                <p className="col-2 card-text">
                  Status: 
                </p>
                <div className="col-8">
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="status" id="statusA" value="A" defaultChecked={true} />
                    <Status value="A" htmlFor="statusA"/>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="status" id="statusC" value="C" />
                    <Status value="C" htmlFor="statusC"/>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="status" id="statusE" value="E" />
                    <Status value="E" htmlFor="statusE"/>
                  </div>
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
                            value={address.id_endereco}
                            checked={this.state.addressId === address.id_endereco} 
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
                      value={this.state.frete} 
                      onChange={this.onChangeFrete}> 
                      
                      {this.state.taxas.map(taxa => {
                        return(
                          <option key={taxa.id_taxa_entrega} value={taxa.valor} onChange={this.onChangeTaxa}>R$ {taxa.valor}</option>
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
                          Feliz Aniversário
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
      </div>
    )
  }
}
