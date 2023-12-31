import Link from 'next/link';

import { TButton } from '@/types';

import styles from './button.module.scss';

const Button: React.FC<TButton> = ({ link, onClick, children }) => (
  <>
    {link ? (
      <Link href={link} className={styles.btn}>
        {children}
      </Link>
    ) : (
      <button onClick={onClick} className={styles.btn}>
        {children}
      </button>
    )}
  </>
);

export default Button;
