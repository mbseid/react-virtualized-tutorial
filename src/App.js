import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      cats: []
    }
  }
  componentWillMount(){

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <p>and react virtualized</p>
        </header>
        <p className="App-intro">

        </p>
      </div>
    );
  }
}

export default App;
