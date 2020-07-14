/** @jsx jsx */
import { jsx } from '@emotion/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const ProductList = ({ onAdd, onRemove, products, cart }) => (
  <List>
    {products.map((product) => (
      <ListItem key={product.id}>
        <ListItemText>{product.name}</ListItemText>
        <ListItemSecondaryAction>
          <IconButton
            data-testid={`remove-product-${product.id}`}
            disabled={!cart.length || cart.every(({ id }) => product.id !== id)}
            onClick={() => onRemove(product)}
          >
            <RemoveIcon />
          </IconButton>
          <IconButton data-testid={`add-product-${product.id}`} onClick={() => onAdd(product)}>
            <AddIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))}
  </List>
);

export default ProductList;
