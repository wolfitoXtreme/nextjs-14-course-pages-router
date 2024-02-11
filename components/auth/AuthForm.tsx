import { useRouter } from 'next/router';
import { FormEvent, useRef, useState } from 'react';

import { signIn, useSession } from 'next-auth/react';

import { EnumAuthProvider, EnumSessionStatus } from '@/types';
import { createUser } from '@/utils/api';

import styles from './AuthForm.module.scss';

const AuthForm = () => {
  const { status: sessionStatus } = useSession();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const switchAuthModeHandler = () => {
    setIsLogin(prevState => !prevState);
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    // FE validation...

    if (isLogin) {
      const result = await signIn(EnumAuthProvider.CREDENTIALS, {
        sentEmail: emailInputRef.current?.value,
        sentPassword: passwordInputRef.current?.value,
        redirect: false, // by default next-auth redirects to the error page
      });

      if (!result?.error) {
        // redirecting when logged in
        // eslint-disable-next-line no-console
        console.log('logged in, redirecting to profile!');
        router.replace('/profile');
      }
    } else {
      try {
        const result = await createUser({
          email: emailInputRef.current?.value || '',
          password: passwordInputRef.current?.value || '',
        });
        // eslint-disable-next-line no-console
        console.log({ result });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log({ error });
      }
    }
  };

  return (
    <section className={styles.auth}>
      {sessionStatus === EnumSessionStatus.LOADING ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
          <form onSubmit={submitHandler}>
            <div className={styles.control}>
              <label htmlFor="email">Your Email</label>
              <input ref={emailInputRef} type="email" id="email" required />
            </div>
            <div className={styles.control}>
              <label htmlFor="password">Your Password</label>
              <input
                ref={passwordInputRef}
                type="password"
                id="password"
                required
              />
            </div>
            <div className={styles.actions}>
              <button>{isLogin ? 'Login' : 'Create Account'}</button>
              <button
                type="button"
                className={styles.toggle}
                onClick={switchAuthModeHandler}>
                {isLogin ? 'Create new account' : 'Login with existing account'}
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  );
};

export default AuthForm;
