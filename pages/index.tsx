import { FormEvent, useRef, useState } from 'react';

import classNames from 'classnames';

import { FeedbackT, MethodE } from '@/types';

export default function Home() {
  const [feedbackItems, setFeebackItems] = useState<FeedbackT[]>([]);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const feebackInputRef = useRef<HTMLTextAreaElement>(null);

  const submitFormHandler = (event: FormEvent) => {
    event.preventDefault();
    const email = emailInputRef.current?.value;
    const text = feebackInputRef.current?.value;

    // eslint-disable-next-line no-console
    console.log({ email }, { text });

    fetch('/api/feedback', {
      method: MethodE.POST,
      body: JSON.stringify({
        email,
        text,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      // eslint-disable-next-line no-console
      .then(data => console.log({ data }));
  };

  const loadDataHandler = () => {
    fetch('/api/feedback')
      .then(response => response.json())
      // eslint-disable-next-line no-console
      .then(({ feedback }) => setFeebackItems(feedback));
  };

  return (
    <>
      <h1>Add a Feedback:</h1>
      <form onSubmit={submitFormHandler}>
        <div className="field">
          <label htmlFor="email">Your email:</label>
          <input ref={emailInputRef} id="email" name="email" type="email" />
        </div>
        <div className="field">
          <label htmlFor="feedback">Your feedback:</label>
          <textarea
            ref={feebackInputRef}
            rows={5}
            id="feedback"
            name="feedback"></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <h1>Retrieve Feedback</h1>
      <button onClick={loadDataHandler}>Get Feedback</button>
      <ul>
        {feedbackItems.map(({ id, email, text }) => (
          <li key={id}>
            <p>
              id: {id}
              <br />
              email: {email}
              <br />
              text: {text}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
