import styles from './LogisticsItem.module.scss';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LogisticsItem(props: any) {
  const { icon: Icon } = props;

  return (
    <li className={styles.item}>
      <span className={styles.icon}>
        <Icon />
      </span>
      <span className={styles.content}>{props.children}</span>
    </li>
  );
}

export default LogisticsItem;
