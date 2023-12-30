import { useRouter } from 'next/router';

import { getEventById } from '@/data/dummy-data';

import EventContent from '@/components/events/eventDetail/EventContent';
import EventLogistics from '@/components/events/eventDetail/EventLogistics';
import EventSummary from '@/components/events/eventDetail/EventSummary';

const EventDetailPage = () => {
  const {
    query: { eventId },
  } = useRouter();

  const event = getEventById(eventId);

  const { title, date, location, image, description } = event || {};

  return (
    <>
      {event ? (
        <>
          <EventSummary title={title} />
          <EventLogistics
            location={location}
            image={image}
            date={date}
            imageAlt={title}
          />
          <EventContent>
            <p>{description}</p>
          </EventContent>
        </>
      ) : (
        <>
          <p>No event found.</p>
        </>
      )}
    </>
  );
};

export default EventDetailPage;
