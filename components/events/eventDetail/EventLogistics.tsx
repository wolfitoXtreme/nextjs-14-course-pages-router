import Image from 'next/image';

import { TEventLogistics } from '@/types';
import { humanReadableDate, formatLineEndings } from '@/utils/utils';

import LogisticsItem from './LogisticsItem';

import AddressIcon from '@/assets/icons/address-icon.svg';
import DateIcon from '@/assets/icons/date-icon.svg';

import styles from './EventLogistics.module.scss';

const EventLogistics: React.FC<TEventLogistics> = ({
  date,
  location,
  image,
  imageAlt,
}) => {
  const formattedDate = humanReadableDate(date as Date);
  const formattedAddress = formatLineEndings(location as string);

  return (
    <section className={styles.logistics}>
      <div className={styles.image}>
        <Image src={`/${image}`} fill alt={imageAlt as string} />
      </div>
      <ul className={styles.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{formattedDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{formattedAddress}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
};

export default EventLogistics;
