import { useRouter } from 'next/router';

const FilteredEventsPage = () => {
  const {
    query: { event },
  } = useRouter();

  return (
    <div>
      <h1>Filtered Event Page</h1>
      <div>
        <h2>Event: {event}</h2>
      </div>
    </div>
  );
};

export default FilteredEventsPage;
