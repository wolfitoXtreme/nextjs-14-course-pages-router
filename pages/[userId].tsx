import { GetServerSideProps } from 'next/types';

import { ParsedUrlQuery } from 'querystring';

import { TUserData } from '@/types';

const UserIdPage = ({ id }: TUserData) => <h3>{id}</h3>;

export default UserIdPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const { params } = context;
  // eslint-disable-next-line no-console
  console.log('server side code here...', { params });
  const { userId } = params as ParsedUrlQuery;

  return {
    props: {
      id: `user-id-${userId}`,
    },
  };
};
