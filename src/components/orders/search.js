import React, { Component } from 'react';
import {
  axiosInstance as axios, 
  getClientePorNomeData
} from '../../api'; 
import { GET_CLIENTE_NOME } from '../../api/endpoints';
import Toolbar from '../toolbar';

export default class Search extends Component {

  constructor(props){
    super(props);

    this.state = {
      term: '',
      hRef: process.env.PUBLIC_URL + '/',
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

    axios.post(GET_CLIENTE_NOME, getClientePorNomeData(this.state.term)).then((response) => {
      const clients = response.data;
      this.props.onSearchFinish(clients);
      
      this.setState({
        hRef: process.env.PUBLIC_URL + '/clientes?page=1',
        linkName: 'Voltar pra clientes',
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
