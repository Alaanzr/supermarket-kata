import { createTypes } from 'redux-action-creator';
import { isFunction } from 'lodash';

const Types = {
  ...createTypes(['SET_PRODUCTS']),
};

export const ProductActions = {
  setProducts: (payload) => (dispatch) => dispatch({ type: Types.SET_PRODUCTS, payload }),
};

const setProducts = (_, payload) => payload;

const reducerMap = {
  [Types.SET_PRODUCTS]: setProducts,
};

export default (state = [], action) => {
  const handler = reducerMap[action.type];
  return isFunction(handler) ? handler(state, action.payload) : state;
};
