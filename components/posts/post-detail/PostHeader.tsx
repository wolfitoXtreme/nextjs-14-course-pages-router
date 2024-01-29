import Image from 'next/image';

import { TPostHeader } from '@/types';

import styles from './PostHeader.module.scss';

const PostHeader: React.FC<TPostHeader> = ({ image, title }) => (
  <header className={styles.header}>
    <h1>{title}</h1>
    <Image src={image} width={200} height={150} alt={title} />
  </header>
);

export default PostHeader;
