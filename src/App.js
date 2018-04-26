import React, { Component } from 'react';
import Routes from './components/Routes.js';
import 'reset-css';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes/>
      </div>
    );
  }
}

export default App;
