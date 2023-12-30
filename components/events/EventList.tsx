import { IEvents } from '@/types';

import EventListItem from './EventListItem';

import styles from './EventList.module.scss';

const EventList: React.FC<IEvents> = ({ events }) => (
  <ul className={styles.list}>
    {events.map((event, index) => (
      <li key={`${event.id}-${index}`}>
        <EventListItem event={event} />
      </li>
    ))}
  </ul>
);

export default EventList;
