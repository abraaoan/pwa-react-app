import React, { Component } from 'react';
import Navbar from '../navbar';
import Toolbar from '../toolbar';

export default class Orders extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Toolbar title="Pedidos" />
            </div>
        )
    }
}