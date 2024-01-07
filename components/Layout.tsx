import Link from 'next/link';

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <>
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/user-profile">User Profile</Link>
      </li>
      <li>
        <Link href="/user4">User 4</Link>
      </li>
      <li>
        <Link href="/last-sales">Last sales</Link>
      </li>
    </ul>
    <main>{children}</main>
  </>
);

export default Layout;
