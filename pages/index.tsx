import Link from 'next/link';
import { GetStaticProps } from 'next/types';

import { TFeaturedEvents } from '@/types';
import { getFeaturedEvents } from '@/utils/api';

import EventList from '@/components/events/EventList';
import NewsletterRegistration from '@/components/input/NewsletterRegistration';

const HomePage = ({ featuredEvents }: TFeaturedEvents) => {
  return (
    <>
      <div>
        <NewsletterRegistration />

        <EventList events={featuredEvents} />
        <p>
          <Link href="/events">All Events</Link>
        </p>
      </div>
    </>
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
