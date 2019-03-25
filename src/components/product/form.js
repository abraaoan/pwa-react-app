import React, { Component } from 'react';

export default class Form extends Component {

  
  render() {
    return (
      <div>
        <form style={{padding: 10}}>
          <div className="form-group row">
            <label for="inputNome">Nome</label>
            <input className="form-control" id="nome" placeholder="Ex: Torta de limão" />
          </div>
          <div className="form-group row">
            <label for="inputPrice">Preço</label>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">R$</div>
              </div>
              <input className="form-control" 
              id="price"
              placeholder="Ex: 120,00"/>
            </div>
          </div>
          <div className="form-group row">
            <label for="inputDescription">Descrição</label>
            <input className="form-control" id="description" placeholder="Ex: Torta feita com suco de limão batido com leite condensado..." />
          </div>
          <div className="form-group row">
            <div className="form-row">
              <div className="col-6">
                <label for="inputState">Tamanho</label>
                <select id="inputState" class="form-control">
                  <option selected>Escolha o tamanho...</option>
                  <option>Grande</option>
                  <option>Médio</option>
                  <option>Pequena</option>
                </select>
              </div>
              <div className="col-6">
                <label for="inputState">Categoria</label>
                <select id="inputState" class="form-control">
                  <option selected>Escolha a categoria...</option>
                  <option>Torta</option>
                  <option>Reta</option>
                  <option>Perpendicular</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
