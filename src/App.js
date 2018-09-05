import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      cats: [],
      catsLoaded: false
    }
  }
  componentWillMount(){
    fetch("/cats").then((cats) => {
      // parse the response body as json
      return cats.json()
    }).then((catJSON) => {
      this.setState({
        cats: catJSON,
        catsLoaded: true
      })
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Catstagram</h1>
          <p>and react virtualized</p>
        </header>
        <div className="App-body">
          {this.state.cats.map((cat) => {
            return (
              <div className='cat-photo' key={cat.id}>
                <p>{cat.name}</p>
                <img src={cat.url} alt={`${cat.name}`}/>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
