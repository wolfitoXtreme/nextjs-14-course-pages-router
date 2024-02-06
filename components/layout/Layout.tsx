import { Fragment } from 'react';

import MainNavigation from './MainNavigation';

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;
