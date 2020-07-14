import { createTypes } from 'redux-action-creator';
import { isFunction } from 'lodash';

const Types = {
  ...createTypes(['ADD_TO_CART', 'REMOVE_FROM_CART']),
};

export const CartActions = {
  addToCart: (payload) => (dispatch) => dispatch({ type: Types.ADD_TO_CART, payload }),
  removeFromCart: (payload) => (dispatch) => dispatch({ type: Types.REMOVE_FROM_CART, payload }),
};

const addToCart = (state, payload) => [...state, payload];

const removeFromCart = (state, payload) => {
  const newState = [...state];
  const index = newState.findIndex((product) => product.id === payload.id);
  newState.splice(index, 1);
  return newState;
};

const reducerMap = {
  [Types.ADD_TO_CART]: addToCart,
  [Types.REMOVE_FROM_CART]: removeFromCart,
};

export default (state = [], action) => {
  const handler = reducerMap[action.type];
  return isFunction(handler) ? handler(state, action.payload) : state;
};
