import Link from 'next/link';
import { GetStaticProps } from 'next/types';

import { TFeaturedEvents } from '@/types';
import { getFeaturedEvents } from '@/utils/api';

import EventList from '@/components/events/EventList';

const HomePage = ({ featuredEvents }: TFeaturedEvents) => {
  // const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <h2>Featured Events</h2>

        <EventList events={featuredEvents} />
        <p>
          <Link href="/events">All Events</Link>
        </p>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
  };
};

export default HomePage;
