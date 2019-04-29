import React, { Component } from 'react';
import Navbar from '../navbar';
import Search from './search';

// ICONS
import Edit from '../../assets/edit';
import Delete from '../../assets/cancel';

const styles = ({
  listView: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: 20,
  },
});

export default class Orders extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Search 
          title="Pedidos"/>
        
        <div style={styles.listView}>
        <table id="tableClients" className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Telefone 1</th>
                <th scope="col">Status</th>
                <th scope="col">Entrega</th>
                <th scope="col">Taxa</th>
                <th scope="col">Data</th>
                <th scope="col" colSpan="2"></th>
              </tr>
            </thead>
            <tbody>
            
                <tr>
                  <th scope="row" className="data">0</th>
                  <td>
                    Rivaplay
                  </td>
                  <td>
                    9999-9999
                  </td>
                  <td>
                    <span class="badge badge-success badge-pill">Aberto</span>
                  </td>
                  <td>
                    Centro
                  </td>
                  <td>
                    R$ 29,90
                  </td>
                  <td>
                    03/02/19
                  </td>
                  <td style={{width: 50}}>
                    <button 
                      type="button" 
                      className="btn btn-link" 
                      data-toggle="tooltip" data-placement="bottom" title="Editar pedido">
                      <Edit />
                    </button>
                  </td>
                  <td style={{width: 50}}>
                    <button 
                      type="button" 
                      className="btn btn-link" 
                      data-toggle="tooltip" data-placement="bottom" title="Cancelar pedido">
                      <Delete />
                    </button>
                  </td>
                </tr>

                <tr>
                  <th scope="row" className="data">1</th>
                  <td>
                    Joaquim Guardanapos
                  </td>
                  <td>
                    9999-9999
                  </td>
                  <td>
                    <span class="badge badge-danger badge-pill">Cancelado</span>
                  </td>
                  <td>
                    Parque Dez de Novembro
                  </td>
                  <td>
                    R$ 9,90
                  </td>
                  <td>
                    31/03/19
                  </td>
                  <td style={{width: 50}}>
                    <button 
                      type="button" 
                      className="btn btn-link" 
                      data-toggle="tooltip" data-placement="bottom" title="Editar pedido">
                      <Edit />
                    </button>
                  </td>
                  <td style={{width: 50}}>
                    <button 
                      type="button" 
                      className="btn btn-link" 
                      data-toggle="tooltip" data-placement="bottom" title="Cancelar pedido">
                      <Delete />
                    </button>
                  </td>
                </tr>

            </tbody>
          </table>
        </div>
      </div>
    )
  }
}