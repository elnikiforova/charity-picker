import React, { Component } from 'react';
import logoHelp from './logo-help.png';
import logo from './logo.svg';
import './App.css';
import Questions from './components/questions';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={logoHelp} className="logo-help" alt="logo-help" />
        </header>
        <Questions />
      </div >
    );
  }
}

export default App;
