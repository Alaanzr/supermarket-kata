import api from '../api';
import { ProductActions } from '../redux/reducers/products';
import { CartActions } from '../redux/reducers/cart';
import { OfferActions } from '../redux/reducers/offers';

export const getProducts = () => async (dispatch) => {
  const products = await api.getProducts();
  dispatch(ProductActions.setProducts(products));
};

export const getOffers = () => async (dispatch) => {
  const offers = await api.getOffers();
  dispatch(OfferActions.setOffers(offers));
};

export const addToCart = (payload) => (dispatch) => {
  dispatch(CartActions.addToCart(payload));
};

export const removeFromCart = (payload) => (dispatch) => {
  dispatch(CartActions.removeFromCart(payload));
};
