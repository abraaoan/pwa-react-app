import React, { Component } from 'react';

const colors = {
  logo: { color: '#FFF' },
  options: {color: '#C8A566'},
  optionDisable: {color: '#C8A566', opacity: 0.5}
}

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar  sticky-top navbar-dark bg-dark" style={{backgroundColor: '#210800'}}>
                <a className="navbar-brand"
                 href={process.env.PUBLIC_URL + '/'}
                 style={colors.logo}>
                 iPede Aí
                </a>
                <ul className="nav justify-content-end">
                  <li className="nav-item">
                    <a 
                     className="nav-link active"
                     href={process.env.PUBLIC_URL + '/clientes?page=1'}
                     style={colors.options}>Clientes</a>
                  </li>
                  <li className="nav-item">
                    <a 
                     className="nav-link"
                     href={process.env.PUBLIC_URL + '/pedidos?page=1'}
                     style={colors.options}>Pedidos</a>
                  </li>
                  <li className="nav-item">
                    <a
                     className="nav-link"
                     href={process.env.PUBLIC_URL + '/produtos?page=1'}
                     style={colors.options}>Produtos</a>
                  </li>
                  <li className="nav-item">
                    <a 
                     className="nav-link disabled" 
                     href={process.env.PUBLIC_URL + '/relatorios'}
                     style={colors.optionDisable}>Relatorios</a>
                  </li>
                </ul>
            </nav>
        )
    }
}
