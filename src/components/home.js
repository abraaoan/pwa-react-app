import React, { Component } from 'react';
import client from '../assets/client.jpg';
import pedidos from '../assets/pedidos.jpg';
import products from '../assets/products.jpg';
import reports from '../assets/report.jpg';

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
            <div class="container-fluid">
                <div style={styles.content}>
                    <div class ="row">
                        <div class="card" style={styles.card}>
                            <div class="card-body">
                                <h5 class="card-title">Clientes</h5>
                                <div class="text-center">
                                    <img src={client} class="img-thumbnail border-0" />
                                </div>
                                <p class="card-text">Cadastrar novos clientes, editar informações e adicionar endereços.</p>
                                <a href="#" class="btn btn-primary">Ir para clientes</a>
                            </div>
                        </div>
                        <div class="card" style={styles.card}>
                            <div class="card-body">
                                <h5 class="card-title">Pedidos</h5>
                                <div class="text-center">
                                    <img src={pedidos} class="img-thumbnail border-0" />
                                </div>
                                <p class="card-text">Adicione, edite e cancele pedidos nessa sessão.</p>
                                <a href="#" class="btn btn-primary">Ir para pedidos</a>
                            </div>
                        </div>
                    </div>
                    <div class ="row">
                        <div class="card" style={styles.card}>
                            <div class="card-body">
                                <h5 class="card-title">Produtos</h5>
                                <div class="text-center">
                                    <img src={products} class="img-thumbnail border-0" />
                                </div>
                                <p class="card-text">Visualizar produtos cadastrados, editar e apagar informações.</p>
                                <a href="/product" class="btn btn-primary">Ir para produtos</a>
                            </div>
                        </div>
                        <div class="card" style={styles.card}>
                            <div class="card-body">
                                <h5 class="card-title">Relatorios</h5>
                                <div class="text-center">
                                    <img src={reports} class="img-thumbnail border-0" />
                                </div>
                                <p class="card-text">Visualizar os relatórios. Veja como esta a lista de pedidos e os status.</p>
                                <a href="#" class="btn btn-primary">Acessar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}