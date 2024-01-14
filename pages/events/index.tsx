import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next/types';

import { TEvent } from '@/types';
import { getAllEvents } from '@/utils/api';

import EventList from '@/components/events/EventList';
import EventsSearch from '@/components/events/EventsSearch';

const AllEventsPage = ({ events }: { events: TEvent[] }) => {
  const { push: routerPush } = useRouter();

  const findEventsHandler = (year?: string, month?: string) => {
    const fullPath = `/events/${year}/${month}`;
    routerPush(fullPath);
  };

  return (
    <>
      <Head>
        <title>NextJS Events: All Events</title>
        <meta name="description" content="Al Events Lorem ipsum..." />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
};

export default AllEventsPage;
