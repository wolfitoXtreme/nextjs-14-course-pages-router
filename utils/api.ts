import { TEvent } from '@/types';

export const getAllEvents = async (): Promise<TEvent[] | []> => {
  const response = await fetch(
    'https://nextjs-course-events-76ab8-default-rtdb.firebaseio.com/events.json',
  );
  const data = await response.json();

  return (
    Object.keys(data).map(id => ({
      id,
      ...data[id],
    })) || []
  );
};

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();

  return allEvents.filter(event => event.isFeatured);
};
