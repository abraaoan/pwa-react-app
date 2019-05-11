import React, { Component } from 'react';

class Confirmation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      confirmation: {}
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
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                
                {/* Content */}
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="kClientName" />
                  <label className="form-check-label" htmlFor="kClientName">
                    <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>Nome:</span> { confirmation.client ? confirmation.client.nome_cliente : " - "  }
                  </label>
                </div>

                <label style={{color: 'rgba(0, 0, 0, 0.5)', marginBottom: -10}}>Itens:</label>
                { confirmation.products ? confirmation.products.map(product => {
                  return (
                    <div className="form-check" style={{marginLeft: 10}} key={product.id_produto}>
                      <input className="form-check-input" type="checkbox" value="" id={`kPrd${product.id_produto}`} />
                      <label className="form-check-label" htmlFor={`kPrd${product.id_produto}`}>
                        {/* TODO add Obs */}
                        {`${product.nome_produto}, ${product.tamanho}, R$ ${product.valor_produto}${product.obs ? ', ' + product.obs : ''}`} 
                      </label>
                    </div>
                  )
                }) : "-" }

                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="kDataEntrega" />
                  <label className="form-check-label" htmlFor="kDataEntrega">
                  <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>Data de entrega:</span> {confirmation.dataEntrega}
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="kEndereco" />
                  <label className="form-check-label" htmlFor="kEndereco">
                  <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>Entregar:</span> { confirmation.endereco ? `${confirmation.endereco.logradouro}, ${confirmation.endereco.numero}, ${confirmation.endereco.bairro} ${confirmation.endereco.complemento ? ', ' + confirmation.endereco.complemento : ''}` : "-" }
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="kTaxa" />
                  <label className="form-check-label" htmlFor="kTaxa">
                  <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>Taxa de entrega:</span> R$ {confirmation.taxa}
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="kTotal" />
                  <label className="form-check-label" htmlFor="kTotal">
                  <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>Total:</span> R$ {confirmation.total}
                  </label>
                </div>


              </div>
              <div className="modal-footer">
                <button key="2" type="button" className="btn btn-primary">Confirmação</button>
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
