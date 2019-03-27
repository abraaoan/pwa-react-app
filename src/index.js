import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Product from './components/product/product';
import Client from './components/clients/clients';
import Order from './components/orders/orders';
import Report from './components/reports/reports';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { Store } from './store';

ReactDOM.render(
    <Provider store={Store}>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={App} />
                <Route path="/product" exact={true} component={Product} />
                <Route path="/clientes" exact={true} component={Client} />
                <Route path="/pedidos" exact={true} component={Order} />
                <Route path="/relatorios" exact={true} component={Report} />
            </Switch>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
