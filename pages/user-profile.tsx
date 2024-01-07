import { GetServerSideProps } from 'next/types';

import { TUserData } from '@/types';

const UserProfilePage = ({ userName }: TUserData) => <h3>{userName}</h3>;

export default UserProfilePage;

// Executes on server every time is called, SSR
export const getServerSideProps: GetServerSideProps = async context => {
  const { params } = context;

  // eslint-disable-next-line no-console
  console.log('server side code here...', { params });

  return {
    props: {
      userName: 'Charles',
    },
  };
};
