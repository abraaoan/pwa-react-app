import React, { Component } from 'react';
import Navbar from '../navbar';
import Toolbar from '../toolbar';

import reportImg from '../../assets/report03.jpg';
import reportImgGraficos from '../../assets/report04.jpg';
import reportImgListagem from '../../assets/report05.jpg';

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

export default class Reports extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Toolbar 
                  shouldHideSearch={true} 
                  linkName="Voltar para home" 
                  title="Relatórios"
                  hRef={process.env.PUBLIC_URL + '/'} />
                  <div className="container-fluid">
                  <div style={styles.content}>
                    <div className ="row">
                        <div className="card" style={styles.card}>
                            <img alt="Cadastro de clientes" src={reportImg} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">Gráficos</h5>
                                <p className="card-text">Relatório de contagem de tortas.</p>
                                <a href={process.env.PUBLIC_URL + '/relatorios/graficos'} className="btn btn-primary stretched-link">Acessar</a>
                            </div>
                        </div>
                        <div className="card" style={styles.card}>
                            <img alt="Cadastro de clientes" src={reportImgGraficos} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">Listagem</h5>
                                <p className="card-text">Relatório de listagem de entregas.</p>
                                <a href={process.env.PUBLIC_URL + '/relatorios/listagem'} className="btn btn-primary stretched-link">Acessar</a>
                            </div>
                        </div>
                        <div className="card" style={styles.card}>
                        <img alt="Cadastro de clientes" src={reportImgListagem} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">Etiquetas</h5>
                                <p className="card-text">Impressão de etiquetas.</p>
                                <a href={process.env.PUBLIC_URL + '/relatorios/etiquetas'} className="btn btn-primary stretched-link">Acessar</a>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
        )
    }
}
