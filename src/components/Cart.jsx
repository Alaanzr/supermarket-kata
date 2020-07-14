/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import { calculateDiscounts } from '../helpers/discount-strategies';
import Typography from './Typography';
import CartTable from './CartTable';
import Divider from '@material-ui/core/Divider';
import DiscountInfo from './DiscountInfo';

const Cart = ({ cart, offers }) => {
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [discounts, setDiscounts] = useState([]);

  const groupedProducts = groupBy(cart, (item) => item.name);

  useEffect(() => {
    const subtotal = cart.reduce(
      (acc, product) => (acc += product.soldAs === 'unit' ? product.price : product.quantity * product.price),
      0,
    );

    const discounts = calculateDiscounts(cart, offers);

    const total = subtotal - discounts.reduce((acc, val) => (acc += val.amount || 0), 0);

    setSubtotal(subtotal);
    setDiscounts(discounts);
    setTotal(total);
  }, [cart, offers]);

  return (
    <div
      css={css`
        padding: 15px;
      `}
    >
      <Typography variant="h4">Cart</Typography>
      {!cart.length ? (
        <Typography variant="body1">No items in cart</Typography>
      ) : (
        <div>
          <div
            css={css`
              margin-bottom: 15px;
            `}
          >
            <CartTable products={groupedProducts} />
          </div>
          <Typography variant="body1" component="div">
            Sub-total: £{subtotal.toFixed(2)}
          </Typography>
          <Divider />
          <DiscountInfo discounts={discounts} />
          <Typography variant="body1" component="div">
            Total: £{total.toFixed(2)}
          </Typography>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.products,
  cart: state.cart,
  offers: state.offers,
});

export default connect(mapStateToProps)(Cart);
