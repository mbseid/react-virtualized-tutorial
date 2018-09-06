import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// We need to include react-virtualized styles
import 'react-virtualized/styles.css';

// bring in the react-virtualized list
import List from 'react-virtualized/dist/commonjs/List';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';




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

  /* Please ensure to understand AppVirtualized.js first */
  render() {
    return (
      // WindowScroller is a higher order component that relays window information
      // to the virtualized list.
      <WindowScroller>
        {({ height, isScrolling, onChildScroll, scrollTop }) => (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to Catstagram</h1>
              <p>and react virtualized</p>
            </header>
            <div>
              <List
                  ref="virtualized-list"
                  className='App-body'
                  // autoHeight prop tells the list that it should size itself. Don't defer to some fixed number
                  autoHeight

                  // height prop is now passed from the WindowScroller
                  height={height}

                  // isScrolling prop is now being managed by the WindowScroller.
                  isScrolling={isScrolling}

                  // onChildScroll prop is now being managed by the WindowScroller.
                  onScroll={onChildScroll}

                  // scrollTop prop let's the list know where the scroll is.
                  scrollTop={scrollTop}

                  // Everything else is the same
                  rowHeight={430}
                  rowCount={this.state.cats.length}
                  overscanRowCount={2}
                  noRowsRenderer={this._noRowsRenderer}
                  rowRenderer={this._rowRenderer}
                  width={400}
                />
            </div>
          </div>
        )}
      </WindowScroller>
    );
  }
}

export default App;
