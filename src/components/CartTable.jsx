/** @jsx jsx */
import { jsx } from '@emotion/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CartTable = ({ products }) => {
  const groupedProducts = Object.keys(products).map((key) => {
    const productList = products[key];
    const product = productList[0];

    return (
      <TableRow key={product.id}>
        <TableCell>
          {product.soldAs === 'unit'
            ? productList.length
            : `${(productList.length * product.quantity).toFixed(2)} ${product.measurementUnit}`}
        </TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell>
          £
          {product.soldAs === 'unit'
            ? (product.price * productList.length).toFixed(2)
            : (product.price * product.quantity * productList.length).toFixed(2)}
        </TableCell>
      </TableRow>
    );
  });

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Quantity</TableCell>
            <TableCell>Item</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{groupedProducts}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartTable;
