import { useRouter } from 'next/router';

import { getAllEvents } from '@/data/dummy-data';

import EventList from '@/components/events/EventList';
import EventsSearch from '@/components/events/EventsSearch';

const AllEventsPage = () => {
  const { push: routerPush } = useRouter();
  const allEvents = getAllEvents();

  const findEventsHandler = (year?: string, month?: string) => {
    const fullPath = `/events/${year}/${month}`;
    routerPush(fullPath);
  };

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={allEvents} />
    </>
  );
};

export default AllEventsPage;
