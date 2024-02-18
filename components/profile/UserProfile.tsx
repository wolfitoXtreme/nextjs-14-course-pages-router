import { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';

import { EnumRequestMethod, EnumSessionStatus, IChangePassword } from '@/types';

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

  const changePasswordHandler: IChangePassword = async ({
    sentOldPassword,
    sentNewPassword,
  }) => {
    const response = await fetch('/api/auth/change-password', {
      method: EnumRequestMethod.PATCH,
      body: JSON.stringify({ sentOldPassword, sentNewPassword }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    // eslint-disable-next-line no-console
    console.log({ data });
  };

  return (
    <section className={styles.profile}>
      {sessionStatus === EnumSessionStatus.LOADING && <p>Loading...</p>}
      {session && (
        <>
          <h1>Your User Profile</h1>
          <ProfileForm onChangePassword={changePasswordHandler} />
        </>
      )}
    </section>
  );
};

export default UserProfile;
