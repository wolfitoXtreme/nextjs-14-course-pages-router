import Link from 'next/link';
import { GetStaticProps } from 'next/types';
import { useState } from 'react';

import { FeedbackT } from '@/types';

import { getPath, extractData } from '@/pages/api/feedback';

const FeedbackPage = ({ feedbackItems }: { feedbackItems: FeedbackT[] }) => {
  // just for demonstration as data is already present in props
  const [detailsData, setDetailsData] = useState<FeedbackT>();
  const loadFeedbackHandler = (id: string) => {
    fetch(`/api/feedback/${id}`) // calling dynamic api route [feedbackId].ts
      .then(response => response.json())
      // error handling...
      .then(data => setDetailsData(data.feedbackItemData));
  };

  return (
    <main>
      <h1>Available Feedbacks:</h1>
      <ul>
        {feedbackItems.map(({ id }) => (
          <li key={id}>
            <b>feedback No. </b> {id}
            <br />
            <button onClick={loadFeedbackHandler.bind(null, id)}>
              Show details
            </button>
          </li>
        ))}
      </ul>
      {detailsData && (
        <>
          <h3>item {detailsData.id} data:</h3>
          <pre>{JSON.stringify(detailsData, null, 2)}</pre>
        </>
      )}
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // no requests are sent because the api is running in the same env.
  const filePath = getPath();
  const data = extractData(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
};

export default FeedbackPage;
