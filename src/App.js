/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { addToCart, removeFromCart } from './actions';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const App = ({ cart, products, addToCart, removeFromCart }) => (
  <Grid
    container
    spacing={2}
    css={css`
      padding: 15px;
    `}
  >
    <Grid item xs={9}>
      <Paper>
        <ProductList products={products} onAdd={addToCart} onRemove={removeFromCart} cart={cart} />
      </Paper>
    </Grid>
    <Grid item xs={3}>
      <Paper>
        <Cart />
      </Paper>
    </Grid>
  </Grid>
);

const mapStateToProps = (state) => ({
  products: state.products,
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (payload) => dispatch(addToCart(payload)),
  removeFromCart: (payload) => dispatch(removeFromCart(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
