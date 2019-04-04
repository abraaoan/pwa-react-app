import React, { Component } from 'react';
import {
  axiosInstance as axios, 
  getProdutosPorNomeData
} from '../../api'; 
import { GET_PRODUTO_POR_NOME } from '../../api/endpoints';
import Toolbar from '../toolbar';

export default class Search extends Component {

  constructor(props){
    super(props);

    this.state = {
      term: '',
      hRef: '/',
      linkName: 'Voltar pra home',
      title: props.title,
    }
    
  }

  onChangeTerm = (e) => {
    this.setState({term: e.target.value});
  }

  onSearch = () => {

    if (!this.state.term)
      return;

    axios.post(GET_PRODUTO_POR_NOME, getProdutosPorNomeData(this.state.term)).then((response) => {
      const products = response.data;
      this.props.onSearchFinish(products);
      
      this.setState({
        hRef: '/product?page=1',
        linkName: 'Voltar pra produtos',
        title: 'Resultado da busca',
      });

    });
  }

  render() {
    return (
      <div>
          <Toolbar
            title={this.state.title} 
            term={this.state.term} 
            onChangeTerm={this.onChangeTerm} 
            onSearch={this.onSearch}
            hRef={this.state.hRef}
            linkName={this.state.linkName}/>
      </div>
    )
  }
}