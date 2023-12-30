import Image from 'next/image';

import { TEvent } from '@/types';
import { humanReadableDate } from '@/utils';

import Button from '@/components/ui/Button';

import AddressIcon from '@/assets/icons/address-icon.svg';
import ArrowRightIcon from '@/assets/icons/arrow-rightIcon.svg';
import DateIcon from '@/assets/icons/date-icon.svg';

import styles from './EventItem.module.scss';

const EventItem: React.FC<{ event: TEvent }> = ({
  event: { id, title, location, date, image },
}) => {
  const formattedDate = humanReadableDate(date);
  const formattedAddress = location.replace(', ', '\n');

  return (
    <>
      <div className={styles.item}>
        <Image src={`/${image}`} alt={title} />
        <div className={styles.content}>
          <div className={styles.summary}>
            <h2>{title}</h2>
            <div className={styles.date}>
              <DateIcon />
              <time>{formattedDate}</time>
            </div>
            <div className={styles.address}>
              <AddressIcon />
              <address>{formattedAddress}</address>
            </div>
          </div>
          <div className={styles.actions}>
            <Button link={`/events/${id}`}>
              <ArrowRightIcon className={styles.icon} />
              <span>Explore Event</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventItem;
