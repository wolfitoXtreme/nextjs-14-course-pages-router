import styles from './ErrorAlert.module.scss';

const ErrorAlert: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className={styles.alert}>{children}</div>;
};

export default ErrorAlert;
