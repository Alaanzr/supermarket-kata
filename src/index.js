import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { getProducts, getOffers } from './actions';

store.dispatch(getProducts());
store.dispatch(getOffers());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
