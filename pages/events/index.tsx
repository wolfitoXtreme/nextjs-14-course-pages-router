import { getAllEvents } from '@/data/dummy-data';

import EventList from '@/components/events/EventList';

const AllEventsPage = () => {
  const allEvents = getAllEvents();

  return (
    <div>
      <h1>All Events Page</h1>
      <EventList events={allEvents} />
    </div>
  );
};

export default AllEventsPage;
