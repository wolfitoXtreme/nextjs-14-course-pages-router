import { GetServerSideProps } from 'next/types';

import { getSession } from 'next-auth/react';

import AuthForm from '@/components/auth/AuthForm';

const AuthPage = () => {
  return <AuthForm />;
};

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default AuthPage;
