import { TDateFilter, TEvent } from '@/types';

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

export const getEventById = async (id: string | string[] | undefined) => {
  const allEvents = await getAllEvents();

  return allEvents.find(event => event.id === id) || [];
};

export const getFilteredEvents = async (dateFilter: TDateFilter) => {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();

  const filteredEvents = allEvents.filter(event => {
    const eventDate = new Date(event.date);

    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};
