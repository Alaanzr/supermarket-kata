import { calculateDiscounts } from '../helpers/discount-strategies';
import { createOffer } from './test-data/offers';
import { createProduct } from './test-data/products';

describe('Discount strategies', () => {
  const product = createProduct({
    soldAs: 'unit',
    price: 5,
  });

  const fixedDiscountOffer = createOffer({
    type: 'fixed-discount',
    productId: product.id,
    purchaseRequirement: 2,
    overridePrice: 1,
  });

  const getXFreeOffer = createOffer({
    type: 'get-x-free',
    productId: product.id,
    purchaseRequirement: 3,
    soldAsXQuantity: 2,
  });

  describe('fixed discount strategy', () => {
    it('should not create any discount entries when we do not meet purchase requirements', () => {
      const discounts = calculateDiscounts([product], [fixedDiscountOffer]);
      expect(discounts).toEqual([]);
    });

    it('should create a discount entry when we meet the purchase requirements', () => {
      const discounts = calculateDiscounts([product, product], [fixedDiscountOffer]);
      expect(discounts).toMatchObject([{ amount: 9, title: `2 for £1 on ${product.name}` }]);
    });
  });

  describe('get x free discount strategy', () => {
    it('should not create any discount entries when we do not meet purchase requirements', () => {
      const discounts = calculateDiscounts([product], [getXFreeOffer]);
      expect(discounts).toEqual([]);
    });

    it('should should create a discount entry when we meet the purchase requirements', () => {
      const discounts = calculateDiscounts([product, product, product], [getXFreeOffer]);
      expect(discounts).toMatchObject([{ amount: 5, title: `3 for 2 on ${product.name}` }]);
    });
  });

  describe('multiple strategies', () => {
    it('should not create any discount entries when we do not meet purchase requirements', () => {
      const discounts = calculateDiscounts([product], [fixedDiscountOffer, getXFreeOffer]);
      expect(discounts).toEqual([]);
    });

    it('should should create a discount and price entry when we meet both of the purchase requirements', () => {
      const discounts = calculateDiscounts([product, product, product], [fixedDiscountOffer, getXFreeOffer]);
      expect(discounts).toMatchObject([
        { amount: 9, title: `2 for £1 on ${product.name}` },
        { amount: 5, title: `3 for 2 on ${product.name}` },
      ]);
    });
  });
});
