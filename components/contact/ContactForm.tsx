import { ChangeEvent, FormEvent, useState } from 'react';

import { EnumRequestMethod, TContactFormFields } from '@/types';

import styles from './ContactForm.module.scss';

const ContactForm = () => {
  // field values can also be extracted a ref, this is an alternative
  const [fieldValues, setFieldValues] = useState<TContactFormFields>({
    email: '',
    message: '',
    name: '',
  });
  const { email, message, name } = fieldValues;

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

    fetch('/api/contact', {
      body: JSON.stringify(fieldValues),
      headers: {
        'Content-Type': 'application/json',
      },
      method: EnumRequestMethod.POST,
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
            onChange={setFieldValueHandler}></textarea>
        </div>

        <div className={styles.actions}>
          <button>Send message</button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
