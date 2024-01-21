import Image from 'next/image';

import { TEvent } from '@/types';
import { formatLineEndings, humanReadableDate } from '@/utils/utils';

import Button from '@/components/ui/Button';

import AddressIcon from '@/assets/icons/address-icon.svg';
import ArrowRightIcon from '@/assets/icons/arrow-rightIcon.svg';
import DateIcon from '@/assets/icons/date-icon.svg';

import styles from './EventListItem.module.scss';

const EventListItem: React.FC<{ event: TEvent }> = ({
  event: { id, date, image, location, title },
}) => {
  const formattedDate = humanReadableDate(date as Date);
  const formattedAddress = formatLineEndings(location);

  return (
    <>
      <div className={styles.item}>
        <div className={styles.image}>
          <Image src={`/${image}`} width={370} height={244} alt={title} />
        </div>
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

export default EventListItem;
