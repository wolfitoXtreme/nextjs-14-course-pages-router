import Link from 'next/link';

import classNames from 'classnames';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Header = () => (
  <header className={classNames(inter.className)}>
    <h1>Feedbacks</h1>
    <nav>
      <h5>Menu</h5>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/feedback">List of feedbacks</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
