import React, { Component } from 'react';

export default class Pages extends Component {
    render() {
        return (
            <div>
                <nav aria-label="Page navigation example" style={{marginTop: 4}}>
                  <ul className="pagination justify-content-end">
                    <li className="page-item disabled">
                      <a className="page-link" href="/product?page=-1" tabIndex="-1" aria-disabled="true">Anterior</a>
                    </li>
                    <li className="page-item"><a className="page-link" href="/product?page=1">1</a></li>
                    <li className="page-item"><a className="page-link" href="/product?page=-2">2</a></li>
                    <li className="page-item"><a className="page-link" href="/product?page=-3">3</a></li>
                    <li className="page-item">
                      <a className="page-link" href="/product?page=next">Próxima</a>
                    </li>
                  </ul>
                </nav>
            </div>
        )
    }
}
