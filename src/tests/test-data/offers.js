import faker from 'faker';

export const createOffer = (overrides = {}) => ({
  id: faker.random.uuid(),
  productId: faker.random.uuid(),
  ...overrides,
});
