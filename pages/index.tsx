import Link from 'next/link';

import { getFeaturedEvents } from '@/data/dummy-data';

import EventList from '@/components/events/EventList';

const HomePage = () => {
  const featuredEvents = getFeaturedEvents();

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

export default HomePage;
