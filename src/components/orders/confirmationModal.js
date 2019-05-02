import React, { Component } from 'react';

class Confirmation extends Component {
  render() {
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
                  <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                  <label className="form-check-label" htmlFor="defaultCheck1">
                    Nome: Rivaplay
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                  <label className="form-check-label" htmlFor="defaultCheck1">
                    Torta de Cupuaçu (M), R$ 145,00, Feliz Aniversario
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                  <label className="form-check-label" htmlFor="defaultCheck1">
                    Torta de Morango (M), R$ 160,00
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                  <label className="form-check-label" htmlFor="defaultCheck1">
                    Data de entrega: 10/05/2019
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                  <label className="form-check-label" htmlFor="defaultCheck1">
                    Entrega: Rua A, Bairro B, 123, Ed. Milano, Apto 1104, Bloco ABCD
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                  <label className="form-check-label" htmlFor="defaultCheck1">
                    Taxa de entrega: R$ 10,00
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" />
                  <label className="form-check-label" htmlFor="defaultCheck2">
                    Total: R$ 320,50
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
