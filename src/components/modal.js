import React, { Component } from 'react';

export default class Modal extends Component {
    render() {
        return (
            <div>
                <div id="modalProduto" className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" role="document">
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
                        { this.props.buttons.map(button => {
                          return button
                        })}
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}
