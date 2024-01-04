import fs from 'fs/promises'; // will fail if executed on the client side (cannot read filesystem)
import path from 'path';

import { TDummyProducts } from '@/types';

export const getProducts = async () => {
  // process.cwd()      -> current working directory
  // data               -> data directory
  // dummy-backend.json'-> targeted file
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const { products } = JSON.parse(jsonData.toString()) as TDummyProducts;

  return products;
};
