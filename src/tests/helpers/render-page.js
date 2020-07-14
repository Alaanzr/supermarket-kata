import { render } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import React from 'react';
import store from '../../store';

export const renderPage = async (Page, { products, offers }) => {
  store.dispatch({
    type: 'SET_PRODUCTS',
    payload: products,
  });

  store.dispatch({
    type: 'SET_OFFERS',
    payload: offers,
  });

  return render(
    <ReduxProvider store={store}>
      <Page />
    </ReduxProvider>,
  );
};
