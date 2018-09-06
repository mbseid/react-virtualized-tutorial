import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import App from './AppVirtualized';
// import App from './AppVirtualizedWindowScroller';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
