import Link from 'next/link';

import styles from './button.module.scss';

const Button: React.FC<{ link: string; children?: React.ReactNode }> = ({
  link,
  children,
}) => (
  <Link href={link} className={styles.btn}>
    {children}
  </Link>
);

export default Button;
