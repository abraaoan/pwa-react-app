import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Toolbar from './toolbar';

const styles = ({
    toolbar: {
        height: 60,
    },
});

export default class Product extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Toolbar />
                <p>Welcome to Product View</p>
            </div>
        )
    }
}