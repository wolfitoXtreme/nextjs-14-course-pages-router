import styles from './EventSummary.module.scss';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function EventSummary(props: any) {
  const { title } = props;

  return (
    <section className={styles.summary}>
      <h1>{title}</h1>
    </section>
  );
}

export default EventSummary;
