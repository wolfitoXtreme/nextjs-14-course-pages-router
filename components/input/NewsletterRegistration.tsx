import { FormEventHandler, useContext, useRef } from 'react';

import { EnumNotificationStatus, EnumRequestMethod } from '@/types';

import { NotificationContext } from '@/context/NotificationContext';

import styles from './NewsletterRegistration.module.scss';

const NewsletterRegistration = () => {
  const { showNotification } = useContext(NotificationContext);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const registrationHandler: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    showNotification({
      message: 'Registering for a newsletter...',
      status: EnumNotificationStatus.PENDING,
      title: 'Signing up',
    });

    // ... Front End validation, then...
    fetch('/api/newsletter', {
      body: JSON.stringify({ email: emailInputRef.current?.value }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: EnumRequestMethod.POST,
    })
      .then(response => {
        // if (response.status === 422) {
        //   throw new Error('Invalid email');
        // }

        // all fine return response
        if (response.ok) {
          return response.json();
        }

        // something fails, use a promise chain to throw an error
        return response.json().then(data => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      .then(data => {
        // eslint-disable-next-line no-console
        console.log('received data', { data });
        showNotification({
          message: 'Success!',
          status: EnumNotificationStatus.SUCCESS,
          title: 'Successfully registered for a newsletter',
        });
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.warn('server error', { error });
        showNotification({
          message: error.message ?? 'Something went wrong!',
          status: EnumNotificationStatus.ERROR,
          title: 'Error!',
        });
      });
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
