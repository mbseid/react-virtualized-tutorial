import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// We need to include react-virtualized styles
import 'react-virtualized/styles.css';

// bring in the react-virtualized list
import List from 'react-virtualized/dist/commonjs/List';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      cats: [],
      catsLoaded: false
    }

    this._noRowsRenderer = this.noRowsRenderer.bind(this);
    this._rowRenderer = this.rowRenderer.bind(this);
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

  getRowHeight({
    index
  }){
    const item = this.state.cats[index];
    return item.height || 410;
  }

  noRowsRenderer(){
    return (
      <p>We have no cats</p>
    );
  }

  rowRenderer({
    index,       // Index of row
    isScrolling, // The List is currently being scrolled
    isVisible,   // This row is visible within the List (eg it is not an overscanned row)
    key,         // Unique key within array of rendered rows
    parent,      // Reference to the parent List (instance)
    style        // IMPORTANT: Style object to be applied to row (to position it);
                 // This must be passed through to the rendered row element.
  }){
    const cat = this.state.cats[index];
    return (
      <div key={key} style={style}>
        <div className='cat-photo'>
          <p>{cat.name}</p>
          <img src={cat.url} alt={`${cat.name}`}/>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Catstagram</h1>
          <p>and react virtualized</p>
        </header>
        <List
            ref="virtualized-list"
            className='App-body'

            // height prop is the total height of the "window" that we want to be visable
            height={600}

            // rowHeight prop is the height of each row, important in the "total" height calculation.
            // Can also be a function if the row height is dymanic. Important part of the total size calculation.
            rowHeight={430}
            //rowHeight={::this.getRowHeight}

            // rowCount prop is the total amount of rows in the collection to be rendered.
            // Important part of the total size calculation.
            rowCount={this.state.cats.length}

            // trivia: what is the total height of a the list if we have 10 items?

            // overscanRowCount prop tells react-virtualized how many rows to render above and below
            // the visiable area. This will eagly fetch the assets to balance "scrolls speed" and bandwidth
            overscanRowCount={0}

            // noRowsRenderer prop is what we should render if rowCount is 0
            noRowsRenderer={this._noRowsRenderer}

            // rowRenderer prop is a function that returns the actual React Node to be rendered
            // PRO TIP: You can't use margins on the outermost dom element. It causes the heights not to be
            rowRenderer={this._rowRenderer}

            // width prop is the total width of the container. Important for grids, not as much for lists.
            width={400}
          />
      </div>
    );
  }
}

export default App;
