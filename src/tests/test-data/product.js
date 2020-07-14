import faker from 'faker';

export const createProduct = (overrides = {}) => ({
  id: faker.random.uuid(),
  name: faker.commerce.productName(),
  ...overrides,
});
