import ReactDOM from 'react-dom';

import classNames from 'classnames';

import { EnumNotificationStatus, INotification } from '@/types';

import styles from './Notification.module.scss';

const Notification: React.FC<INotification> = ({ message, status, title }) => {
  return ReactDOM.createPortal(
    <div
      className={classNames(styles.notification, {
        [styles.error]: status === EnumNotificationStatus.ERROR,
        [styles.pending]: status === EnumNotificationStatus.PENDING,
        [styles.success]: status === EnumNotificationStatus.SUCCESS,
      })}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.querySelectorAll('[data-id="notifications"]')[0],
  );
};

export default Notification;
