import { GetStaticProps, GetStaticPaths } from 'next/types';

import fs from 'fs/promises'; // will fail if executed on the client side (cannot read filesystem)
import path from 'path';

import { TDummyProduct, TDummyProducts } from '@/types';

const ProductDetailsPage = ({
  product: { title, description },
}: {
  product: TDummyProduct;
}) => {
  return (
    <>
      <h2>{title}</h2>
      <p>{description}</p>
    </>
  );
};

export default ProductDetailsPage;

export const getStaticProps: GetStaticProps = async context => {
  const { params } = context;
  const { productId } = params || {};

  // process.cwd()      -> current working directory
  // data               -> data directory
  // dummy-backend.json'-> targeted file
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const { products } = JSON.parse(jsonData.toString()) as TDummyProducts;

  // eslint-disable-next-line no-console
  console.log('regenerating...', { context });

  const product = products.find(({ id }) => id === productId);

  return {
    props: {
      product,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { productId: 'p1' } },
      { params: { productId: 'p2' } },
      { params: { productId: 'p3' } },
      { params: { productId: 'p4' } },
      { params: { productId: 'p5' } },
    ],
    fallback: false,
  };
};
