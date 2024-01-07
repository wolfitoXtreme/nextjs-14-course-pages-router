import Link from 'next/link';
import { GetStaticProps } from 'next/types';

import { TDummyProducts } from '@/types';
import { getProducts } from '@/utils';

const Homepage: React.FC<TDummyProducts> = ({ products }) => {
  return (
    <ul>
      {products.map(({ id, title }, index) => (
        <li key={`${id}-${index}`}>
          <Link href={`/products/${id}`}>{title}</Link>
        </li>
      ))}
    </ul>
  );
};

// will generate the necessary code/date to be served by the server
export const getStaticProps: GetStaticProps = async () => {
  // code here will never reach the client side

  const products = await getProducts();

  // eslint-disable-next-line no-console
  console.log('regenerating...'); // will log only is app is re-loaded after 10 seconds, see below

  // return {
  //   props: {
  //     products: [{ id: 'p1', title: 'product 1' }],
  //   },
  // };

  return {
    props: {
      products: products,
    },
    revalidate: 10, // re-generate if there are updates after 10 seconds (production)
    // will redirect if data fetching fails while attempting to re-generate
    ...(!products
      ? { redirect: { destination: '/no-data-example-route' } }
      : {}),
    // will trigger if data fetching returns empty while attempting to re-generate
    ...(products && !products.length ? { notFound: true } : {}),
  };
};

export default Homepage;
