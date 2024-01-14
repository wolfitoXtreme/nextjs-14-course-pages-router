import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next/types';

import { ParsedUrlQuery } from 'querystring';

import { TEvent } from '@/types';
import { getEventById, getFeaturedEvents } from '@/utils/api';
import { trimWords, isEmpty } from '@/utils/utils';

import EventContent from '@/components/events/eventDetail/EventContent';
import EventLogistics from '@/components/events/eventDetail/EventLogistics';
import EventSummary from '@/components/events/eventDetail/EventSummary';

const EventDetailPage = ({ event }: { event: TEvent }) => {
  // const {
  //   query: { eventId },
  // } = useRouter();

  // const event = getEventById(eventId);

  const { title, date, location, image, description } = event || {};

  return (
    <>
      <Head>
        <title>NextJS Events: {title}</title>
        <meta
          name="description"
          content={description ? trimWords(description, undefined) : ''}
        />
      </Head>
      {event && !isEmpty(event) ? (
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
        <div className="center">
          <p>Loading...</p>
        </div>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const { params } = context;
  const { eventId } = params as ParsedUrlQuery;

  const event = await getEventById(eventId);

  return {
    props: {
      event,
    },
    // will retrieve data again after given timeout
    // (otherwise static generated data will be static until rebuild)
    revalidate: 30,
  };
};

// this is a dynamic page [...x], then need to specify which paths will be pre-rendered
export const getStaticPaths: GetStaticPaths = async () => {
  const featuredEvents = await getFeaturedEvents();

  const eventsIds = featuredEvents.map(({ id }) => id);

  const pathsWithParams = eventsIds.map(id => ({
    params: { eventId: id },
  }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
};

export default EventDetailPage;
