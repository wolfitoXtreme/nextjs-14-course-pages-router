import { GetStaticProps, GetStaticPaths } from 'next/types';

import fs from 'fs/promises'; // will fail if executed on the client side (cannot read filesystem)
import path from 'path';

import { TDummyProduct, TDummyProducts } from '@/types';

const ProductDetailsPage = ({
  product = {},
}: {
  product: Partial<TDummyProduct>; // Using 'fallback=true' causes this tu be undefined
}) => {
  // as 'fallback=true', need to check for data existence
  const hasAllData = Object.keys(product).every(
    productKey => !!(product as Record<string, string>)[productKey],
  );

  return (
    <>
      {hasAllData ? (
        <>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
        </>
      ) : (
        <p>Loading product..</p>
      )}
    </>
  );
};

// const ProductDetailsPage = ({ product }: { product: TDummyProduct }) => {
//   // eslint-disable-next-line no-console
//   console.log({ product }, product.title);

//   return (
//     <>
//       {product ? (
//         <>
//           <h1>Has product</h1>
//           <pre>{JSON.stringify(product, null, 2)}</pre>
//           <h2>{product.title}</h2>
//           <p>{product.description}</p>
//         </>
//       ) : (
//         <p>Loading products...</p>
//       )}
//     </>
//   );
// };

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
      // { params: { productId: 'p3' } },
      // { params: { productId: 'p4' } },
      // { params: { productId: 'p5' } },
    ],
    fallback: true, // only pre generates de specified paths data
    // fallback: 'blocking', // will block until data is available, no need to check for it (ex: ...loading)
  };
};
