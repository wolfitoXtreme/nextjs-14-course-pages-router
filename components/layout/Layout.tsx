import { useContext } from 'react';

import { NotificationContext } from '@/context/NotificationContext';

import Notification from '@/components/ui/Notification';

import Header from './Header';

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { notification } = useContext(NotificationContext);

  return (
    <>
      <Header />
      <main>{children}</main>
      {notification && <Notification {...notification} />}
    </>
  );
};

export default Layout;
