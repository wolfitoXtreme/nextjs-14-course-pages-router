import { humanReadableDate } from '@/utils';

import Button from '@/components/ui/Button';

import styles from './ResultsTitle.module.scss';

const ResultsTitle: React.FC<{ date: Date }> = ({ date }) => {
  const formattedDate = humanReadableDate(date);

  return (
    <section className={styles.title}>
      <h1>Events in {formattedDate}</h1>
      <Button link="/events">Show all events</Button>
    </section>
  );
};

export default ResultsTitle;
