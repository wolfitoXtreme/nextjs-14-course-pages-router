import { IEvents } from '@/types';

import EventItem from './EventItem';

import styles from './EventList.module.scss';

const EventList: React.FC<IEvents> = ({ events }) => (
  <ul className={styles.list}>
    {events.map((event, index) => (
      <li key={`${event.id}-${index}`}>
        <EventItem event={event} />
      </li>
    ))}
  </ul>
);

export default EventList;
