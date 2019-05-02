import React, { Component } from 'react';

// ICONS
import Status from './status';
import Remove from '../../assets/delete';

const styles = ({
  listView: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: 20,
  },
  cards: {
    marginTop: 10
  }
});

export default class AddForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      
    }
    
  }

  render() {
    return (
      <div>
          {/* Cliente */}
          <div className="card" style={styles.cards}>
            <div className="card-header">
              Cliente
            </div>
            <div className="card-body container">
              <div className="row">
                <p className="col-4 card-text">Nome: Rivaplay</p>
                <p className="col card-text">Telefone: 9999-9999</p>
              </div>
              <div className="row">
                <p className="col-4 card-text">
                  Data e hora da entregada:
                </p>
                <div className="col-4">
                <input className="form-control form-control-sm" type="text" placeholder="01/01/2019 14:00" />
                </div>
              </div>
              <div className="row">
                <p className="col-2 card-text">
                  Status: 
                </p>
                <div className="col-8">
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="status" id="statusA" value="A" checked />
                    <Status value="A" htmlFor="statusA"/>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="status" id="statusC" value="C" />
                    <Status value="C" htmlFor="statusC"/>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="status" id="statusE" value="E" />
                    <Status value="E" htmlFor="statusE"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Endereço */}
          <div className="card" style={styles.cards}>
            <div className="card-header">
              Endereço
            </div>
            <div className="card-body">

              <div className="row">
                <p className="card-text col">Local de entrega</p>
                <p className="card-text col">Retirada na loja</p>
              </div>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="form-check col-4" style={{ marginLeft: 14}}>
                      <input className="form-check-input" type="radio" name="delivery" id="devilery1" value="option1" checked />
                      <label class="form-check-label" htmlFor="devilery1">
                        Endereço A
                      </label>
                    </div>
                    <div className="col-4">
                      <select className="form-control" id="exampleFormControlSelect1">
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                        <option>40</option>
                        <option>50</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-check col-4"  style={{ marginLeft: 14}}>
                      <input className="form-check-input" type="radio" name="delivery" id="devilery2" value="option2" />
                      <label className="form-check-label" htmlFor="devilery2">
                        Endereço B
                      </label>
                    </div>

                    <div className="col-4">
                      <select className="form-control" id="exampleFormControlSelect1">
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                        <option>40</option>
                        <option>50</option>
                      </select>
                    </div>

                  </div>
                </div>
                <div className="col">
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="retirada" id="retirada1" value="centro" />
                    <label class="form-check-label" htmlFor="retirada1">
                      Centro
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="retirada" id="retirada2" value="vieralves" />
                    <label class="form-check-label" htmlFor="retirada2">
                      Vieralves
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="button" 
                className="btn btn-primary"
                data-toggle="tooltip" 
                style={{marginTop: 12}}
                data-placement="bottom" title="Remove produto" disabled>
                Adicionar Endereço
              </button>
            </div>
          </div>

          {/* Produtos */}
          <div className="card" style={styles.cards}>
            <div className="card-header">
              Produtos
            </div>
            <div className="card-body">
              <table id="tableClients" className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item</th>
                    <th scope="col">Valor</th>
                    <th scope="col" colSpan="2">Observação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className="data">0</th>
                    <td>
                      Torta de Cupu
                    </td>
                    <td>
                      R$ 120,00
                    </td>
                    <td>
                      Feliz Aniversário
                    </td>
                    <td style={{width: 50}}>
                      <button 
                        type="button" 
                        className="btn btn-link" 
                        data-toggle="tooltip" data-placement="bottom" title="Remove produto">
                        <Remove />
                      </button>
                    </td>
                  </tr>  
                </tbody>
              </table>
              <button 
                type="button" 
                className="btn btn-primary"
                data-toggle="tooltip" data-placement="bottom" title="Remove produto">
                Adicionar
              </button>
            </div>
          </div>
      </div>
    )
  }
}
