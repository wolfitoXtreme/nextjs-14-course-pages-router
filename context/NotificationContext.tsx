import { createContext, useEffect, useState } from 'react';

import { EnumNotificationStatus, TNotification } from '@/types';

export const NotificationContext = createContext<{
  hideNotification: () => void;
  notification: TNotification | null;
  showNotification: (notificationData: TNotification) => void;
}>({
  hideNotification: () => {},
  notification: null,
  showNotification: () => {},
});

export const NotificationContextProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [activeNotification, setActiveNotification] =
    useState<TNotification | null>(null);

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === EnumNotificationStatus.SUCCESS ||
        activeNotification.status === EnumNotificationStatus.ERROR)
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [activeNotification]);

  const showNotificationHandler: {
    (args: TNotification): void;
  } = notificationData => {
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  const context = {
    hideNotification: hideNotificationHandler,
    notification: activeNotification,
    showNotification: showNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};
