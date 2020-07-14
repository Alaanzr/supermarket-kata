const calculatePriceDiscount = (products, offer, discounts = []) => {
  while (products.length) {
    const subgroup = products.splice(0, offer.purchaseRequirement);
    if (subgroup.length >= offer.purchaseRequirement) {
      const product = subgroup[0];
      const saving = product.unitPrice * subgroup.length - offer.overridePrice;

      discounts.push({
        amount: saving,
        title: `${offer.purchaseRequirement} for £${offer.overridePrice} on ${product.name}`,
      });
    }
  }

  return discounts;
};

const calculateQuantityDiscount = (products, offer, discounts = []) => {
  while (products.length) {
    const subgroup = products.splice(0, offer.purchaseRequirement);
    if (subgroup.length >= offer.purchaseRequirement) {
      const product = subgroup[0];
      const saving = product.unitPrice * subgroup.length - offer.soldAsXQuantity * product.unitPrice;

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
    if (offer.type === 'price-discount') {
      const matchingProducts = [...products].filter((product) => product.id === offer.productId);
      calculatePriceDiscount(matchingProducts, offer, discounts);
    } else if (offer.type === 'quantity-discount') {
      const matchingProducts = [...products].filter((product) => product.id === offer.productId);
      calculateQuantityDiscount(matchingProducts, offer, discounts);
    }
  });

  return discounts;
};
