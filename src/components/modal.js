import React, { Component } from 'react';

export default class Modal extends Component {
    render() {
        return (
            <div>
                <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{this.props.title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        {this.props.children}
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="submit" form="productForm" className="btn btn-primary">Salvar</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}
