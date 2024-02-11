import { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';

import { EnumSessionStatus } from '@/types';

import ProfileForm from './ProfileForm';

import styles from './UserProfile.module.scss';

const UserProfile = () => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  // eslint-disable-next-line no-console
  console.log({ session }, { sessionStatus });

  if (sessionStatus === EnumSessionStatus.UNAUTHENTICATED) {
    router.replace('/auth');
  }

  return (
    <section className={styles.profile}>
      {sessionStatus === EnumSessionStatus.LOADING && <p>Loading...</p>}
      {session && (
        <>
          <h1>Your User Profile</h1>
          <ProfileForm />
        </>
      )}
    </section>
  );
};

export default UserProfile;
