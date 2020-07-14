/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useSelector, useDispatch } from 'react-redux';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { addToCart, removeFromCart } from './actions';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const App = () => {
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const onAdd = (payload) => dispatch(addToCart(payload));
  const onRemove = (payload) => dispatch(removeFromCart(payload));

  return (
    <Grid
      container
      spacing={2}
      css={css`
        padding: 15px;
      `}
    >
      <Grid item xs={9}>
        <Paper>
          <ProductList products={products} onAdd={onAdd} onRemove={onRemove} cart={cart} />
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper>
          <Cart />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default App;
