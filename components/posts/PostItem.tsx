import Image from 'next/image';
import Link from 'next/link';

import { TPost } from '@/types';
import { humanReadableDate } from '@/utils/utils';

import styles from './PostItem.module.scss';

const PostItem: React.FC<{ post: TPost }> = ({
  post: { date, image, slug, text, title },
}) => {
  const formattedDate = humanReadableDate(date as Date);

  return (
    <li className={styles.post}>
      <Link href={`/posts/${slug}`}>
        <div className={styles.image}>
          <Image
            src={`/images/posts/${slug}/${image}`}
            width={300}
            height={200}
            alt={title}
            layout="responsive"
          />
        </div>
        <div className={styles.content}>
          <h3>{title}</h3>
          <time>{formattedDate}</time>
          <p>{text}</p>
        </div>
      </Link>
    </li>
  );
};

export default PostItem;
