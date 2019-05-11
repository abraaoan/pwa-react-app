import React, { Component } from 'react';
import client from '../../assets/client.jpg';
import pedidos from '../../assets/pedidos.jpg';
import products from '../../assets/products.jpg';
import reports from '../../assets/report.jpg';

const styles = ({
        card: {
            width: 270,
            margin: 25
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
                            <div className="card-body">
                                <h5 className="card-title">Clientes</h5>
                                <div className="text-center">
                                    <img alt="Cadastro de clientes" src={client} className="img-thumbnail border-0" />
                                </div>
                                <p className="card-text">Cadastrar novos clientes, editar informações e adicionar endereços.</p>
                                <a href={process.env.PUBLIC_URL + '/clientes?page=1'} className="btn btn-primary">Ir para clientes</a>
                            </div>
                        </div>
                        <div className="card" style={styles.card}>
                            <div className="card-body">
                                <h5 className="card-title">Pedidos</h5>
                                <div className="text-center">
                                    <img alt="Cadastro de Pedidos" src={pedidos} className="img-thumbnail border-0" />
                                </div>
                                <p className="card-text">Adicione, edite, cancele e mude o status dos pedidos nessa sessão. </p>
                                <a href={process.env.PUBLIC_URL + '/pedidos?page=1'} className="btn btn-primary">Ir para pedidos</a>
                            </div>
                        </div>
                        <div className="card" style={styles.card}>
                            <div className="card-body">
                                <h5 className="card-title">Produtos</h5>
                                <div className="text-center">
                                    <img alt="Cadastro de produtos" src={products} className="img-thumbnail border-0" />
                                </div>
                                <p className="card-text">Visualizar produtos cadastrados, editar e apagar informações.</p>
                                <a href={process.env.PUBLIC_URL + '/product?page=1'} className="btn btn-primary">Ir para produtos</a>
                            </div>
                        </div>
                        <div className="card" style={styles.card}>
                            <div className="card-body">
                                <h5 className="card-title">Relatorios</h5>
                                <div className="text-center">
                                    <img alt="Cadastro de Relatórios" src={reports} className="img-thumbnail border-0" />
                                </div>
                                <p className="card-text">Visualizar os relatórios. Veja como esta a lista de pedidos e os status.</p>
                                <button 
                                  disabled
                                  href={process.env.PUBLIC_URL + '/relatorios'} 
                                  className="btn btn-primary"
                                  data-toggle="tooltip" data-placement="bottom" title="Ainda não ta pronto! 😘">Acessar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
