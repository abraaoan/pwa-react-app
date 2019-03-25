import React, { Component } from 'react';
import client from '../../assets/client.jpg';
import pedidos from '../../assets/pedidos.jpg';
import products from '../../assets/products.jpg';
import reports from '../../assets/report.jpg';

const styles = ({
        card: {
            width: 320,
            margin: 25
        },
        cardImage: {
            width: 200
        },
        content: {
            width: 715,
            margin: '25px auto',
        }

    });

export default class Home extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div style={styles.content}>
                    <div className ="row">
                        <div className="card" style={styles.card}>
                            <div className="card-body">
                                <h5 className="card-title">Clientes</h5>
                                <div className="text-center">
                                    <img src={client} className="img-thumbnail border-0" />
                                </div>
                                <p className="card-text">Cadastrar novos clientes, editar informações e adicionar endereços.</p>
                                <a href="/clientes" className="btn btn-primary">Ir para clientes</a>
                            </div>
                        </div>
                        <div className="card" style={styles.card}>
                            <div className="card-body">
                                <h5 className="card-title">Pedidos</h5>
                                <div className="text-center">
                                    <img src={pedidos} className="img-thumbnail border-0" />
                                </div>
                                <p className="card-text">Adicione, edite e cancele pedidos nessa sessão.</p>
                                <a href="/pedidos" className="btn btn-primary">Ir para pedidos</a>
                            </div>
                        </div>
                    </div>
                    <div className ="row">
                        <div className="card" style={styles.card}>
                            <div className="card-body">
                                <h5 className="card-title">Produtos</h5>
                                <div className="text-center">
                                    <img src={products} className="img-thumbnail border-0" />
                                </div>
                                <p className="card-text">Visualizar produtos cadastrados, editar e apagar informações.</p>
                                <a href="/product" className="btn btn-primary">Ir para produtos</a>
                            </div>
                        </div>
                        <div className="card" style={styles.card}>
                            <div className="card-body">
                                <h5 className="card-title">Relatorios</h5>
                                <div className="text-center">
                                    <img src={reports} className="img-thumbnail border-0" />
                                </div>
                                <p className="card-text">Visualizar os relatórios. Veja como esta a lista de pedidos e os status.</p>
                                <a href="/relatorio" className="btn btn-primary">Acessar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
