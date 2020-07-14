import { calculateDiscounts } from '../helpers/discount-strategies';
import { createOffer } from './test-data/offer';
import { createProduct } from './test-data/product';

describe('Discount strategies', () => {
  const product = createProduct({
    unitPrice: 5,
  });

  const priceOffer = createOffer({
    type: 'price-discount',
    productId: product.id,
    purchaseRequirement: 2,
    overridePrice: 1,
  });

  const quantityOffer = createOffer({
    type: 'quantity-discount',
    productId: product.id,
    purchaseRequirement: 3,
    soldAsXQuantity: 2,
  });

  describe('price discount strategy', () => {
    it('should not create any discount entries when we do not meet purchase requirements', () => {
      const discounts = calculateDiscounts([product], [priceOffer]);
      expect(discounts).toEqual([]);
    });

    it('should create a discount entry when we meet the purchase requirements', () => {
      const discounts = calculateDiscounts([product, product], [priceOffer]);
      expect(discounts).toMatchObject([{ amount: 9, title: `2 for £1 on ${product.name}` }]);
    });
  });

  describe('quantity discount strategy', () => {
    it('should not create any discount entries when we do not meet purchase requirements', () => {
      const discounts = calculateDiscounts([product], [quantityOffer]);
      expect(discounts).toEqual([]);
    });

    it('should should create a discount entry when we meet the purchase requirements', () => {
      const discounts = calculateDiscounts([product, product, product], [quantityOffer]);
      expect(discounts).toMatchObject([{ amount: 5, title: `3 for 2 on ${product.name}` }]);
    });
  });

  describe('multiple strategies', () => {
    it('should not create any discount entries when we do not meet purchase requirements', () => {
      const discounts = calculateDiscounts([product], [priceOffer, quantityOffer]);
      expect(discounts).toEqual([]);
    });

    it('should should create a discount and price entry when we meet both of the purchase requirements', () => {
      const discounts = calculateDiscounts([product, product, product], [priceOffer, quantityOffer]);
      expect(discounts).toMatchObject([
        { amount: 9, title: `2 for £1 on ${product.name}` },
        { amount: 5, title: `3 for 2 on ${product.name}` },
      ]);
    });
  });
});
