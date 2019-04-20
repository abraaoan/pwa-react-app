import React, { Component } from 'react';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand" href={process.env.PUBLIC_URL + '/'}>iPede Aí</a>
                <ul className="nav justify-content-end">
                  <li className="nav-item">
                    <a className="nav-link active" href={process.env.PUBLIC_URL + '/clientes?page=1'}>Clientes</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href={process.env.PUBLIC_URL + '/pedidos'}>Pedidos</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href={process.env.PUBLIC_URL + '/produtos?page=1'}>Produtos</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href={process.env.PUBLIC_URL + '/relatorios'}>Relatorios</a>
                  </li>
                </ul>
            </nav>
        )
    }
}
