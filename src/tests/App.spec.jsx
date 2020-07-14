import { renderPage } from './helpers/render-page';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import { createOffer } from './test-data/offers';
import { createProduct } from './test-data/products';

describe('App page', () => {
  const product1 = createProduct({
    soldAs: 'unit',
    price: 5,
  });

  const product2 = createProduct({
    soldAs: 'unit',
    price: 1,
  });

  const priceOffer = createOffer({
    type: 'fixed-discount',
    productId: product1.id,
    purchaseRequirement: 2,
    overridePrice: 1,
  });

  const quantityOffer = createOffer({
    type: 'get-x-free',
    productId: product2.id,
    purchaseRequirement: 3,
    soldAsXQuantity: 2,
  });

  const renderAppPage = async () =>
    renderPage(App, { products: [product1, product2], offers: [priceOffer, quantityOffer] });

  it('should state that there are no items in the cart on initial load', async () => {
    const { findByText } = await renderAppPage();

    expect(await findByText(/no items in cart/i)).toBeInTheDocument();
  });

  it('should display the product name on the page', async () => {
    const { findByText } = await renderAppPage();
    const regex = new RegExp(product1.name, 'i');
    expect(await findByText(regex)).toBeInTheDocument();
  });

  it('should update the total when an item is added/removed from the cart', async () => {
    const { getByTestId, findByText, queryByText } = await renderAppPage();

    const addProduct = getByTestId(`add-product-${product1.id}`);
    const removeProduct = getByTestId(`remove-product-${product1.id}`);

    fireEvent.click(addProduct);

    expect(await findByText(/^sub-total: £5/i)).toBeInTheDocument();
    expect(await findByText(/^total to pay: £5/i)).toBeInTheDocument();

    fireEvent.click(removeProduct);

    expect(await queryByText(/^sub-total: £5/i)).toBeNull();
    expect(await queryByText(/^total to pay: £5/i)).toBeNull();
  });

  it('should show savings when purchase requirements are met', async () => {
    const { getByTestId, findByText, queryByText } = await renderAppPage();

    expect(await queryByText(/^total savings/i)).toBeNull();

    const addProduct1 = getByTestId(`add-product-${product1.id}`);
    const addProduct2 = getByTestId(`add-product-${product2.id}`);

    fireEvent.click(addProduct1);
    fireEvent.click(addProduct1);

    expect(await findByText(/total savings: -£9/i));

    fireEvent.click(addProduct2);
    fireEvent.click(addProduct2);
    fireEvent.click(addProduct2);

    expect(await findByText(/total savings: -£10/i));
  });
});
