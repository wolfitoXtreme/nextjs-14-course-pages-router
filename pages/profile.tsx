import { GetServerSideProps } from 'next/types';

import { getSession } from 'next-auth/react';

import UserProfile from '@/components/profile/UserProfile';

const ProfilePage = () => {
  return <UserProfile />;
};

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: { session }, // not used but required to be
  };
};

export default ProfilePage;
