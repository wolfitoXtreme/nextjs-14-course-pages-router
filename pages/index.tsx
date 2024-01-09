import Link from 'next/link';
import { GetStaticProps } from 'next/types';

import { TFeaturedEvents } from '@/types';
import { getFeaturedEvents } from '@/utils/api';

import EventList from '@/components/events/EventList';

const HomePage = ({ featuredEvents }: TFeaturedEvents) => {
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

// All data pre-rendered, not likely to change
export const getStaticProps: GetStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    // will retrieve data again after given timeout (otherwise data will be static until rebuild)
    revalidate: 1800,
  };
};

export default HomePage;
