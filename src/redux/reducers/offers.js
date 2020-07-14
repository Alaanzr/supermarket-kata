import { createTypes } from 'redux-action-creator';
import { isFunction } from 'lodash';

const Types = {
  ...createTypes(['SET_OFFERS']),
};

export const OfferActions = {
  setOffers: (payload) => (dispatch) => dispatch({ type: Types.SET_OFFERS, payload }),
};

const setOffers = (_, payload) => payload;

const reducerMap = {
  [Types.SET_OFFERS]: setOffers,
};

export default (state = [], action) => {
  const handler = reducerMap[action.type];
  return isFunction(handler) ? handler(state, action.payload) : state;
};
