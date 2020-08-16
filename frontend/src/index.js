import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import App from './containers/app';

let store;

if (__DEV__) {
  store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
} else {
  store = createStore(reducers, applyMiddleware(thunk));
}

ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.querySelector('#app'));
