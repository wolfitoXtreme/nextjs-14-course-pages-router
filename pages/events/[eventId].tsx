import { useRouter } from 'next/router';

const EventDetailPage = () => {
  const {
    query,
    query: { eventId },
  } = useRouter();

  return (
    <div>
      <h1>Single Event Page</h1>
      <div>
        <h2>Event: {eventId}</h2>
        <pre>{JSON.stringify(query, null, 2)}</pre>
      </div>
    </div>
  );
};

export default EventDetailPage;
