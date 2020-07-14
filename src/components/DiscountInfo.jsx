/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import Typography from './Typography';
import Divider from '@material-ui/core/Divider';

const DiscountInfo = ({ discounts }) => {
  if (!discounts.length) return null;

  return (
    <Fragment>
      <Typography variant="body1" component="div">
        Savings:{' '}
        {discounts.map((discount, i) => (
          <div key={i}>
            {discount.title}: -£{discount.amount.toFixed(2)}
          </div>
        ))}
      </Typography>
      <Divider />
      <Typography variant="body1" component="div">
        Total savings: -£{discounts.reduce((acc, val) => (acc += val.amount), 0).toFixed(2)}
      </Typography>
      <Divider />
    </Fragment>
  );
};

export default DiscountInfo;
