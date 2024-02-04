import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import {
  EnumNotificationStatus,
  EnumRequestMethod,
  TContactFormFields,
  TNotification,
} from '@/types';

import Notification from '@/components/ui/Notification';

import styles from './ContactForm.module.scss';

const ContactForm = () => {
  // field values can also be extracted a ref, this is an alternative
  const [fieldValues, setFieldValues] = useState<TContactFormFields>({
    email: '',
    message: '',
    name: '',
  });

  const [formIsDisabled, setFormIsDisabled] = useState(false);

  const [notificationData, setNotificationData] =
    useState<TNotification | null>(null);

  const { email, message, name } = fieldValues;

  useEffect(() => {
    // disable fields while pending
    if (notificationData?.status === EnumNotificationStatus.PENDING) {
      setFormIsDisabled(true);
    }

    // removes notification  on success or error
    if (
      notificationData?.status === EnumNotificationStatus.SUCCESS ||
      notificationData?.status === EnumNotificationStatus.ERROR
    ) {
      const timer = setTimeout(() => {
        setNotificationData(null);
        setFormIsDisabled(false);

        // reset fields on success
        if (notificationData?.status === EnumNotificationStatus.SUCCESS) {
          setFieldValues({
            email: '',
            message: '',
            name: '',
          });
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notificationData?.status]);

  const setFieldValueHandler = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const {
      target: { id: fieldId, value },
    } = event;

    setFieldValues({
      ...fieldValues,
      [fieldId]: value,
    });
  };

  const sendMessagesHandler = (event: FormEvent) => {
    event.preventDefault();
    // client side validation would be here...

    setNotificationData({
      message: 'Contact data being sent now',
      status: EnumNotificationStatus.PENDING,
      title: 'Sending...',
    });

    fetch('/api/contact', {
      body: JSON.stringify(fieldValues),
      headers: {
        'Content-Type': 'application/json',
      },
      method: EnumRequestMethod.POST,
    }).then(response => {
      if (response.ok) {
        // eslint-disable-next-line no-console
        console.log('response OK', { response });

        setNotificationData({
          message: 'Contact data sent',
          status: EnumNotificationStatus.SUCCESS,
          title: 'Complete',
        });

        return response.json();
      }

      response.json().then(data => {
        setNotificationData({
          message: data.message,
          status: EnumNotificationStatus.ERROR,
          title: 'Error in Contact Form',
        });
      });
    });
  };

  return (
    <section className={styles.contact}>
      <h1>How can I Help You?</h1>
      <form action="" className={styles.form} onSubmit={sendMessagesHandler}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="email">Your e-mail:</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              disabled={formIsDisabled}
              onChange={setFieldValueHandler}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="name">Your name:</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              disabled={formIsDisabled}
              onChange={setFieldValueHandler}
            />
          </div>
        </div>

        <div className={styles.control}>
          <label htmlFor="message">Your message:</label>
          <textarea
            id="message"
            rows={5}
            required
            value={message}
            disabled={formIsDisabled}
            onChange={setFieldValueHandler}></textarea>
        </div>

        <div className={styles.actions}>
          <button disabled={formIsDisabled}>Send message</button>
        </div>
      </form>
      {notificationData && <Notification {...notificationData} />}
    </section>
  );
};

export default ContactForm;
