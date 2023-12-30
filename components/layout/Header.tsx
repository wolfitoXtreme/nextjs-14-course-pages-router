import Link from 'next/link';

import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <h1 className={styles.logo}>
      <Link href="/">Events</Link>
    </h1>
    <nav className={styles.navigation}>
      <ul>
        <li>
          <Link href="/events">Browse all events</Link>
          <Link href=""></Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
