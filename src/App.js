import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './components/navbar.js';
import Home from './components/home/home.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Home/>
      </div>
    );
  }
}

export default App;
