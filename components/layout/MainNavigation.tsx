import Link from 'next/link';

import { useSession, signOut } from 'next-auth/react';

import { EnumSessionStatus } from '@/types';

import styles from './MainNavigation.module.scss';

const MainNavigation = () => {
  const { data: session, status: sessionStatus } = useSession();

  // eslint-disable-next-line no-console
  console.log({ session }, { sessionStatus });

  const logoutHandler = () => {
    signOut();
  };

  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && sessionStatus !== EnumSessionStatus.LOADING && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}

          {session && (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
