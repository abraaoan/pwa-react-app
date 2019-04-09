import React, { Component } from 'react';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand" href={process.env.PUBLIC_URL + '/'}>iPede Aí</a>
            </nav>
        )
    }
}
