import { FormEventHandler, useRef } from 'react';

import { EnumRequestMethod } from '@/types';

import styles from './NewsletterRegistration.module.scss';

const NewsletterRegistration = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);

  const registrationHandler: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    // ... Front End validation
    fetch('/api/newsletter', {
      body: JSON.stringify({ email: emailInputRef.current?.value }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: EnumRequestMethod.POST,
    })
      .then(response => {
        if (response.status === 422) {
          throw new Error('Invalid email');
        }

        return response.json();
      })
      // eslint-disable-next-line no-console
      .then(data => console.log('received data', { data }))
      // eslint-disable-next-line no-console
      .catch(error => console.warn('server error', { error }));
  };

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            ref={emailInputRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterRegistration;
