import styles from './EventContent.module.scss';

const EventContent: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return <section className={styles.content}>{children}</section>;
};

export default EventContent;
