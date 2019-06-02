import React, { Component } from 'react';
import {  currentDateTime, unformatDateTime } from '../utils';

//API
import {
  axiosInstance as axios, 
  putPedidoData,
} from '../../api'; 
import { 
  PUT_PEDIDO,
 } from '../../api/endpoints';

const isOnDevMode = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');

class Confirmation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      defaultKeys: ['clientName', 'dataEntrega', 'endereco', 'taxa', 'total', 'pagamento'],
      keys: [],
    }
  }

  addValue = (value) => {
    let index = this.state.defaultKeys.indexOf(value);

    if (index === -1) {
      this.setState({defaultKeys: this.state.defaultKeys.concat(value)});
    }

  }

  onCheckChange = (e) => {

    const value = e.target.value;

    if (this.state.keys.includes(value)) {

      const index = this.state.keys.indexOf(value);
      var values = this.state.keys;
      
      values.splice(index, 1);

      this.setState({
        keys: values
      });

    } else {

      this.setState({
        keys: [...this.state.keys, value],
      });

    }
  }

  sendData = (confirmation) => {

    const client = confirmation.client ? confirmation.client : null;
    const products = confirmation.products ? confirmation.products : null;
    const address = confirmation.endereco ? confirmation.endereco: null;

    if (!client | !address | !products)
      return

    var param = {
      id_cliente: client.id_cliente,
      status: 'A',
      id_endereco: address.id_endereco,
      taxa_entrega: confirmation.taxa ? confirmation.taxa : 0,
      data_pedido: currentDateTime(),
      data_entrega: unformatDateTime(confirmation.dataEntrega ? confirmation.dataEntrega : null),
      observacao: confirmation.observacao ? confirmation.observacao : '',
      pagamento: confirmation.pagamento ? confirmation.pagamento : 'D',
      
    }

    for (var i = 0; i < products.length; i++ ) {
      const keyBase = `produto_valor[${i}]`;
      const product = products[i];
      const id = `${keyBase}[id]`;
      const nome = `${keyBase}[nome]`;
      const tamanho = `${keyBase}[tamanho]`;
      const valor = `${keyBase}[valor]`;
      const observacao = `${keyBase}[observacao]`;

      param[id] = product.id_produto;
      param[nome] = product.nome_produto;
      param[tamanho] = product.tamanho;
      param[valor] = product.valor_produto;
      param[observacao] = product.obs ? product.obs : '';
    }

    axios.post(PUT_PEDIDO, putPedidoData(param))
    .then(response => {

      try {
        const result = response.data;

        if (result['status'] === 'ok') {
          this.props.onNotify('', 'Pedido adicionado com sucesso');
        } else {
          alert('OPS!');
        }

        console.log('-->', result);

      } catch(errors) {
        console.error(errors);
      }

    }).catch(errors => console.error(errors));


//id_cliente:6
// status:A
// id_endereco:
// taxa_entrega:
// data_pedido:2019-04-14 15:21:58
// data_entrega:2019-02-16 16:00:00
// produto_valor[0][id]:20
// produto_valor[0][nome]:T. BACALHAU
// produto_valor[0][tamanho]:MEDIO
// produto_valor[0][valor]:170
// produto_valor[0][observacao]:
// produto_valor[1][id]:2
// produto_valor[1][nome]:T. COCO
// produto_valor[1][tamanho]:PEQUENO
// produto_valor[1][valor]:110
// produto_valor[1][observacao]:Placa de Bem Vindo
// observacao:
// pagamento:

  }

  getAddressLabel = (confirmation) => {
    const idCentro = isOnDevMode ? '11' : '13';
    const idVieralves = isOnDevMode ? '12' : '14';

    if (confirmation.endereco) {
      
      if (confirmation.endereco.id_endereco === idCentro || confirmation.endereco.id_endereco === idVieralves) {
        return 'Retirar na loja: '
      } else {
        return 'No endereço: ';
      }

    } else {
      return '';
    }

  }

  render() {

    const { confirmation } = this.props;

    return (
      <div>
        <div id="confirmationModal" className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Confirmação do pedido</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={ () => { this.props.onCancel(); }}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                
                {/* Content */}
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="kClientName" value="clientName" onChange={this.onCheckChange} />
                  <label className="form-check-label" htmlFor="kClientName">
                    <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>Nome:</span> { confirmation.client ? confirmation.client.nome_cliente : " - "  }
                  </label>
                </div>

                <label style={{color: 'rgba(0, 0, 0, 0.5)', marginBottom: -10}}>Seu pedido é:</label>
                { confirmation.products ? confirmation.products.map(product => {
                  this.addValue(product.id_produto);
                  
                  return (
                    <div className="form-check" style={{marginLeft: 10}} key={product.id_produto}>
                      <input className="form-check-input" type="checkbox" value={product.id_produto} id={`kPrd${product.id_produto}`} onChange={this.onCheckChange} />
                      <label className="form-check-label" htmlFor={`kPrd${product.id_produto}`}>
                        {/* TODO add Obs */}
                        {`${product.nome_produto}, ${product.tamanho}, R$ ${product.valor_produto}${product.obs ? ', ' + product.obs : ''}`} 
                      </label>
                    </div>
                  )
                }) : "-" }

                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="dataEntrega" id="kDataEntrega" onChange={this.onCheckChange} />
                  <label className="form-check-label" htmlFor="kDataEntrega">
                  <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>Para entrega no dia:</span> {confirmation.dataEntrega}
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="endereco" id="kEndereco" onChange={this.onCheckChange} />
                  <label className="form-check-label" htmlFor="kEndereco">
                    <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>
                      {this.getAddressLabel(confirmation)}
                    </span> 
                    { confirmation.endereco ? `${confirmation.endereco.logradouro}, ${confirmation.endereco.numero}, ${confirmation.endereco.bairro} ${confirmation.endereco.complemento ? ', ' + confirmation.endereco.complemento : ''}` : "-" }
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="taxa" id="kTaxa" onChange={this.onCheckChange} />
                  <label className="form-check-label" htmlFor="kTaxa">
                    <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>
                      {confirmation.taxa === '0' ? 'Sem taxa de entrega: ' : 'Com a taxa de entrega: '}
                    </span> 
                    R$ {confirmation.taxa}
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="pagamento" id="kPagamento" onChange={this.onCheckChange} />
                  <label className="form-check-label" htmlFor="kPagamento">
                  <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>Forma de pagamento:</span> {confirmation.pagamento === 'C' ? 'Cartão' : 'Dinheiro'}
                  </label>
                </div>
                {confirmation.observacao ? 
                <div className="form-check">
                  <label className="form-check-label" htmlFor="kTotal">
                  <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>Observacao:</span> {confirmation.observacao}
                  </label>
                </div>
                :
                ''
                }
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="total" id="kTotal" onChange={this.onCheckChange} />
                  <label className="form-check-label" htmlFor="kTotal">
                  <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>Totalizando:</span> R$ {confirmation.total}
                  </label>
                </div>


              </div>
              <div className="modal-footer">
                <button 
                key="2" 
                type="button" 
                className="btn btn-primary"
                disabled={this.state.keys.length !== this.state.defaultKeys.length}
                onClick={ () => { this.sendData(confirmation) }}>Confirmação</button>
                <button 
                  key="3" 
                  type="button" 
                  className="btn btn-secondary" 
                  data-dismiss="modal"
                  onClick={ () => { this.props.onCancel(); }}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Confirmation
