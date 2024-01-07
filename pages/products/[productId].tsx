import { GetStaticProps, GetStaticPaths } from 'next/types';

import { ParsedUrlQuery } from 'querystring';

import { TDummyProduct } from '@/types';
import { getProducts } from '@/utils';

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
      <h1>Product Page</h1>
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
  const { productId } = params as ParsedUrlQuery;

  const products = await getProducts();

  // eslint-disable-next-line no-console
  console.log('regenerating...', { context });

  const product = products.find(({ id }) => id === productId);

  return {
    // props: {
    //   product,
    // },
    // revalidate: 10,

    // check is there is data (fallback: true), to avoid errors (dev) or rendering an empty page (prod)
    ...(product ? { props: { product }, revalidate: 10 } : { notFound: true }),
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getProducts();

  const productsIds = products
    .filter(({ priority }) => priority)
    .map(({ id }) => id);

  // eslint-disable-next-line no-console
  console.log('', { productsIds });

  const pathsWithParams = productsIds.map(id => ({
    params: { productId: id },
  }));

  return {
    paths: pathsWithParams,
    // paths: [
    //   { params: { productId: 'p1' } },
    //   { params: { productId: 'p2' } },
    //   // { params: { productId: 'p3' } },
    //   // { params: { productId: 'p4' } },
    //   // { params: { productId: 'p5' } },
    // ],
    fallback: true, // only pre generates de specified paths data
    // fallback: 'blocking', // will block until data is available, no need to check for it (ex: ...loading)
    // fallback: false, // will trigger 404 error if the data is not found
  };
};
