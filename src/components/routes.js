import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from '../App';
import Product from './product/product';
import Client from './clients/clients';
import Order from './orders/orders';
import Report from './reports/reports';
import NotFound from './notFound';
import { Provider } from 'react-redux';
import { Store } from '../store';
import createHistory from 'history/createBrowserHistory';

export default function Routes() {

  const history = createHistory({
    basename: process.env.PUBLIC_URL,
  });
  
  return (
    <Provider store={Store}>
    <Router basename='/pwa-react-app/' history={history}>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/product" component={Product} />
            <Route path="/clientes" component={Client} />
            <Route path="/pedidos" component={Order} />
            <Route path="/relatorios" component={Report} />
            <Route path='*' component={NotFound} />
        </Switch>
    </Router>
</Provider>
  );
}