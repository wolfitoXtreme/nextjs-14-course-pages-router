import classNames from 'classnames';
import { Inter } from 'next/font/google';

import Header from './Header';

const inter = Inter({ subsets: ['latin'] });

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <>
    <Header />
    <main className={classNames(inter.className)}>{children}</main>
  </>
);

export default Layout;
