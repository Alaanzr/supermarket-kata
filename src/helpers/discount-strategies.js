const fixedDiscountStrategy = (products, offer, discounts = []) => {
  while (products.length) {
    const subgroup = products.splice(0, offer.purchaseRequirement);
    if (subgroup.length >= offer.purchaseRequirement) {
      const product = subgroup[0];
      const saving = product.price * subgroup.length - offer.overridePrice;

      discounts.push({
        amount: saving,
        title: `${offer.purchaseRequirement} for £${offer.overridePrice} on ${product.name}`,
      });
    }
  }

  return discounts;
};

const getXFreeStrategy = (products, offer, discounts = []) => {
  while (products.length) {
    const subgroup = products.splice(0, offer.purchaseRequirement);
    if (subgroup.length >= offer.purchaseRequirement) {
      const product = subgroup[0];
      const saving = product.price * subgroup.length - offer.soldAsXQuantity * product.price;

      discounts.push({
        amount: saving,
        title: `${offer.purchaseRequirement} for ${offer.soldAsXQuantity} on ${product.name}`,
      });
    }
  }

  return discounts;
};

export const calculateDiscounts = (products, offers) => {
  const discounts = [];

  offers.forEach((offer) => {
    if (offer.type === 'fixed-discount') {
      const matchingProducts = [...products].filter((product) => product.id === offer.productId);
      fixedDiscountStrategy(matchingProducts, offer, discounts);
    } else if (offer.type === 'get-x-free') {
      const matchingProducts = [...products].filter((product) => product.id === offer.productId);
      getXFreeStrategy(matchingProducts, offer, discounts);
    }
  });

  return discounts;
};
