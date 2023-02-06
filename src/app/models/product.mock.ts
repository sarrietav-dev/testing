import { faker } from '@faker-js/faker';
import { Product } from './product.model';

export const generateOneProduct = (): Product => {
  return {
    id: faker.datatype.uuid(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.datatype.number(),
    category: {
      id: faker.datatype.number(),
      name: faker.commerce.department(),
    },
    images: [faker.image.imageUrl(), faker.image.imageUrl()],
  };
};

export const generateManyProducts = (n: number = 10): Product[] => {
  return Array.from({ length: n }, () => generateOneProduct());
};
