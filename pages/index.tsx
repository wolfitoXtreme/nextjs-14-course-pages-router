import fs from 'fs/promises'; // will fail if executed on the client side (cannot read filesystem)
import path from 'path';

import { TDummyProduct } from '@/types';

const Homepage: React.FC<TDummyProduct> = ({ products }) => {
  return (
    <ul>
      {products.map(({ id, title }, index) => (
        <li key={`${id}-${index}`}>{title}</li>
      ))}
    </ul>
  );
};

// will generate the necessary code/date to be served by the server
export const getStaticProps = async () => {
  // process.cwd()      -> current working directory
  // data               -> data directory
  // dummy-backend.json'-> targeted file
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const { products } = JSON.parse(jsonData.toString()) as TDummyProduct;

  // code here will never reach the client side
  // return {
  //   props: {
  //     products: [{ id: 'p1', title: 'product 1' }],
  //   },
  // };

  return {
    props: {
      products: products,
    },
  };
};

export default Homepage;
