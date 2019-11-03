import React, { Component } from 'react';
import Navbar from '../navbar';
import Toolbar from '../toolbar';
import MaskedInput from 'react-maskedinput';
import ReactToPrint from 'react-to-print';
import GraficoContent from './graficoContent';

import {
  axiosInstance as axios,
  categorias,
} from '../../api';
import { 
  GET_CATEGORIA_PRODUTO,
} from '../../api/endpoints';

export default class Reports extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentDate: '',
      category: '',
      categories: [],
    }

  }

  getCategories = () => {
    axios.post(GET_CATEGORIA_PRODUTO, categorias())
    .then(response => {

      const result = response.data;
      
      this.setState({
        categories: result,
      });

    }).catch(errors => console.error(errors));
  }

  // --- OnChanges

  onChangeCategory = (e) => {
    this.setState({category: e.target.value}, () => {
      this.refs.content.getReport();
    });
  }

  onDateChange = (e) => {
    this.setState({currentDate: e.target.value});
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter')
      this.refs.content.getReport()
  }

  componentDidMount = () => {
    this.getCategories();
  }

  render() {
    return (
      <div>
        <Navbar />
        <Toolbar 
          shouldHideSearch={true} 
          linkName="Voltar para relatórios" 
          title="Gráfico"
          hRef={process.env.PUBLIC_URL + '/relatorios'} />
        
        <div className="input-group" style={{width: 180, marginLeft: 60, float: 'left'}}>
          <MaskedInput type="text" 
              className="form-control"
              placeholder="01/01/2019"
              mask="11/11/1111"
              aria-describedby="basic-addon1"
              value={this.state.currentDate}
              onChange={this.onDateChange}
              onKeyPress={this.onKeyPress}/>
          <div className="input-group-prepend">
            <div className="btn-group" role="group">
              <button id="btnGroupDrop1" 
              type="button" 
              className="btn btn-primary"
              onClick={ () => { this.refs.content.getReport() }}>
                Filtrar
              </button>
            </div>
          </div>
        </div>
        <div className="row" style={{marginLeft: 10, marginRight:10, marginBottom: 50, width: 200, float: 'left'}}>  
          <label className="col-sm" htmlFor="inputState" style={{width: 60, marginTop: 6}}>Categoria:</label>
          <select id="inputState" 
          className="form-control col-sm" 
          value={this.state.category} 
          onChange={this.onChangeCategory}
          style={{textTransform: 'lowercase', width: 100}}>
            <option 
                key={0} 
                value={null}>
                {'Todas'}
              </option>
            {this.state.categories.map(categorie => {
              return (
                <option 
                  key={categorie.id_categoria} 
                  value={categorie.categoria}>
                  {categorie.categoria}
                </option>
              )
            })}
          </select>
        </div>
        <div style={{marginLeft: 20, marginBottom: 50, float: 'left'}}>
          <ReactToPrint
          trigger={() => <button type="button" className="btn btn-primary">Imprimir</button>}
          content={() => this.refs.content}
          pageStyle="
          @page {
            size: A4;
          }
          "
          />
        </div>
        <div className="container-fluid">
          <GraficoContent 
            ref="content" 
            currentDate={this.state.currentDate}
            currentCategory={this.state.category}/>
        </div>
      </div>
    )
  }
}
