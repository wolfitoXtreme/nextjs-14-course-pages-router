import { useContext } from 'react';

import classNames from 'classnames';

import { EnumNotificationStatus, INotification } from '@/types';

import { NotificationContext } from '@/context/NotificationContext';

import styles from './notification.module.scss';

const Notification: React.FC<INotification> = ({ message, status, title }) => {
  const { hideNotification } = useContext(NotificationContext);

  return (
    <div
      onClick={hideNotification}
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
