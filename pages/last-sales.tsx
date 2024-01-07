import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';

import useSWR from 'swr';

import { TSalesData } from '@/types';

const LastSales = ({ sales }: { sales: TSalesData[] }) => {
  const [updatedSales, setUpdatedSales] = useState<TSalesData[]>(sales);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   fetch('https://nextjs-course-f1359-default-rtdb.firebaseio.com/sales.json')
  //     .then(response => response.json())
  //     .then(data => {
  //       const salesData = Object.keys(data).map(id => ({ id, ...data[id] }));
  //       console.log({ data }, { salesData });
  //       setSales(salesData);
  //       setIsLoading(false);
  //     });
  // }, []);

  // will load the data when component renders for the first time
  const { data, error } = useSWR(
    'https://nextjs-course-f1359-default-rtdb.firebaseio.com/sales.json',
    url => fetch(url).then(res => res.json()),
  );

  useEffect(() => {
    if (data) {
      const salesData = Object.keys(data).map(id => ({ id, ...data[id] }));
      setUpdatedSales(salesData);
    }
  }, [data]);

  return (
    <ul>
      {/* {isLoading ? ( */}
      {error ? (
        <p>Error loading data</p>
      ) : !data ? (
        <p>Loading...</p>
      ) : (
        updatedSales.map(({ id, userName, volume }, index) => (
          <li key={`${id}-${index}`}>
            {userName} - ${volume}
          </li>
        ))
      )}
    </ul>
  );
};

export default LastSales;

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    'https://nextjs-course-f1359-default-rtdb.firebaseio.com/sales.json',
  );
  const data = await response.json();
  const salesData = Object.keys(data).map(id => ({ id, ...data[id] }));

  // eslint-disable-next-line no-console
  console.log({ data }, { salesData });

  return {
    props: {
      sales: salesData,
    },
    // revalidate: 10, // re-generate if there are updates after 10 seconds (production)
  };
};
