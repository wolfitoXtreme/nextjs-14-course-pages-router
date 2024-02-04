import classNames from 'classnames';

import { EnumNotificationStatus, INotification } from '@/types';

import styles from './Notification.module.scss';

const Notification: React.FC<INotification> = ({ message, status, title }) => {
  return (
    <div
      className={classNames(styles.notification, {
        [styles.error]: status === EnumNotificationStatus.ERROR,
        [styles.pending]: status === EnumNotificationStatus.PENDING,
        [styles.success]: status === EnumNotificationStatus.SUCCESS,
      })}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
