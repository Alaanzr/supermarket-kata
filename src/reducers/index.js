import { combineReducers } from 'redux';
import cart from './cart';
import products from './products';
import offers from './offers';

export default combineReducers({
  cart,
  products,
  offers,
});
