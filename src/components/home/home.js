import React, { Component } from 'react';
import client from '../../assets/client.jpg';
import pedidos from '../../assets/pedidos.jpg';
import products from '../../assets/products.jpg';
import reports from '../../assets/report.jpg';
import '../styles/style.css';

const styles = ({
        card: {
            width: 270,
            margin: 25,
            textAlign: 'left',
        },
        cardImage: {
            width: 200
        },
        content: {
            margin: '15px auto',
            width: 1250,
        }

    });

export default class Home extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div style={styles.content}>
                    <div className ="row">
                        <div className="card" style={styles.card}>
                            <img alt="Cadastro de clientes" src={client} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">Clientes</h5>
                                <p className="card-text">Cadastrar novos clientes, editar informações e adicionar endereços.</p>
                                <a href={process.env.PUBLIC_URL + '/clientes?page=1'} className="btn btn-primary stretched-link">Ir para clientes</a>
                            </div>
                        </div>
                        <div className="card" style={styles.card}>
                            <img alt="Cadastro de Pedidos" src={pedidos} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">Pedidos</h5>
                                <p className="card-text">Adicione, edite, cancele e mude o status dos pedidos nessa sessão. </p>
                                <a href={process.env.PUBLIC_URL + '/pedidos?page=1'} className="btn btn-primary stretched-link">Ir para pedidos</a>
                            </div>
                        </div>
                        <div className="card" style={styles.card}>
                            <img alt="Cadastro de produtos" src={products} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">Produtos</h5>
                                <p className="card-text">Visualizar produtos cadastrados, editar e apagar informações.</p>
                                <a href={process.env.PUBLIC_URL + '/produtos?page=1'} className="btn btn-primary stretched-link">Ir para produtos</a>
                            </div>
                        </div>
                        <div className="card" style={styles.card}>
                        <img alt="Cadastro de Relatórios" src={reports} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">Relatorios</h5>
                                <p className="card-text">Visualizar os relatórios. Veja como esta a lista de pedidos e os status.</p>
                                <a href={process.env.PUBLIC_URL + '/relatorios'} className="btn btn-primary stretched-link">Acessar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
