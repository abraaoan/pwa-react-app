import React, { Component } from 'react';
import Navbar from '../navbar';
import Toolbar from '../toolbar';

export default class Reports extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Toolbar title="Relatórios" />
            </div>
        )
    }
}