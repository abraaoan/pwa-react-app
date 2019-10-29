import React, { Component } from 'react';
import Navbar from '../navbar';
import Toolbar from '../toolbar';
import jsPDF from 'jspdf';
import MaskedInput from 'react-maskedinput';

// API
import {
  axiosInstance as axios, 
  listagemData,
  categorias,
} from '../../api'; 
import { LISTAGEM_GERAL, LISTAGEM_POR_CATEGORIA, GET_CATEGORIA_PRODUTO } from '../../api/endpoints';
import {formatDateTime, isValidDate} from '../utils';

export default class Etiquetas extends Component {

  constructor(props) {
    super(props)

    this.state = {
      date: '',
      orders: [],
      category: '',
      categories: [],
    }

  }

  // --- OnChanges

  onChangeCategory = (e) => {
    this.setState({category: e.target.value});
  }

  onDateChange = (e) => {
    this.setState({date: e.target.value});
  }

  getReport = (print = false) => {

    if (this.state.date === '')
      return;

    if (!isValidDate(this.state.date + ' 23:59:59')) {
      alert('Data deve ser maior que a data atual.');
      return;
    }

    const currentCategory = this.state.category;
    const category = currentCategory === 'Todas' ? null : currentCategory;

    //
    axios.post(category ? LISTAGEM_POR_CATEGORIA : LISTAGEM_GERAL, listagemData(this.state.date, currentCategory))
    .then(response => {

      const result = response.data;
      const orders = result.sort((a, b) => (a.horario > b.horario) ? 1 : -1)
      
      this.setState({orders: orders});
      console.log(orders);

      if (print && orders.length > 0) {
        this.genaratePDF();
      } else if (orders.length === 0) {
        alert("Nenhum resultado encontrado");
      } 
      
    }).catch(errors => console.error(errors));

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

  componentDidMount = () => {
    this.getReport();
    this.getCategories();
  }

  genaratePDF = () => {

    var doc = new jsPDF()

    var width   = doc.internal.pageSize.getWidth();
    var height  = doc.internal.pageSize.getHeight(); 

    // Style
    doc.setFont("helvetica");
    doc.setFontSize(12);
    doc.setFontStyle('normal');

    const padding = 3;
    const numberOfItemPerPage = 27;

    // First value of x.
    const fx = 3;
    var x = fx;
    const fy = 1;
    var y = fy;

    const cellWidth = (width - ((padding + fx) * 2)) / 3;
    const cellHeight = (height - ((fy * 2) + 4)) / 9;

    var i = 0;

    this.state.orders.map((order, index) => {

      var name = `${order.item}-${order.tamanho}`;

      var nameSize = doc.getTextDimensions(name).w;

      // Calculate crop text
      while (nameSize > cellWidth) {

        // Remove last word
        var lastIndex = name.lastIndexOf(" ");
        name = name.substring(0, lastIndex);

        nameSize = doc.getTextDimensions(name).w;

      }

      var value = `${order.nome_cliente.split(' ')[0]}-${order.telefone1}\n`;
      value += `${name}\n`;
      value += `${formatDateTime(order.horario)}\n`;

      x = ((cellWidth + padding) * i) + fx;

      doc.setTextColor("#666666");
      doc.setDrawColor(255,255,255);
      doc.cell(x, y, cellWidth, cellHeight, value);
      
      i++;

      // Next row
      if (index > 0 && (index + 1) % 3 === 0) {
        i = 0;
        y += cellHeight
      }

      // Next page
      if ((index + 1) % numberOfItemPerPage === 0) {
        y = fy;
        i = 0;
        doc.addPage('a4', 'portrait');
      }

      return '';
      
    });

    doc.cellInitialize();
    doc.autoPrint({variant: 'javascript'});
    doc.save('Etiquetas.pdf')
    
  }

  render() {
    return (
      <div>
        <Navbar />
        <Toolbar 
          shouldHideSearch={true} 
          linkName="Voltar para relatórios" 
          title="Etiquetas"
          hRef={process.env.PUBLIC_URL + '/relatorios'} />
        
        <div className="row" style={{width: 460, marginLeft: 60}}>
          <MaskedInput type="text" 
              className="form-control col-sm"
              placeholder="01/01/2019"
              mask="11/11/1111"
              aria-describedby="basic-addon1"
              value={this.state.date}
              onChange={this.onDateChange}
              onKeyPress={this.onKeyPress}
              style={{width:100}}/>

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
          
          <div className="col-sm">
            <button id="btnGroupDrop1" 
            type="button" 
            className="btn btn-primary"
            style={{width:110}}
            onClick={ () => { this.getReport(true) }}>
              Gerar PDF
            </button>
          </div>
        </div>
        <div className="container-fluid">
          {/* { this.genaratePDF() } */}
        </div>
      </div>
    )
  }
}
