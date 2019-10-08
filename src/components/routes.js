import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../App';
import Product from './product/product';
import Clients from './clients/clients';
import ClientDetail from './clients/detail';
import Order from './orders/orders';
import OrderDetail from './orders/detail';
import Report from './reports/reports';
import Graficos from './reports/grafico';
import List from './reports/listagem';
import Etiquestas from './reports/etiqueta';
import NotFound from './notFound';
import { Provider } from 'react-redux';
import { Store } from '../store';

export default function Routes() {
  
  return (
    <Provider store={Store}>
    <BrowserRouter>
        <Switch>
            <Route exact  path={process.env.PUBLIC_URL + '/'} component={App} />
            <Route path={process.env.PUBLIC_URL + '/produtos'} component={Product} />
            <Route path={process.env.PUBLIC_URL + '/clientes'} component={Clients} />
            <Route path={process.env.PUBLIC_URL + `/cliente/:id`} component={ClientDetail} />
            <Route path={process.env.PUBLIC_URL + `/pedido/:id`} component={OrderDetail} />
            <Route path={process.env.PUBLIC_URL + '/pedidos'} component={Order} />
            <Route path={process.env.PUBLIC_URL + '/relatorios/graficos'} component={Graficos} />
            <Route path={process.env.PUBLIC_URL + '/relatorios/listagem'} component={List} />
            <Route path={process.env.PUBLIC_URL + '/relatorios/etiquetas'} component={Etiquestas} />
            <Route  path={process.env.PUBLIC_URL + '/relatorios'} component={Report}/>
            <Route path='*' component={NotFound} />
        </Switch>
    </BrowserRouter>
</Provider>
  );
}
