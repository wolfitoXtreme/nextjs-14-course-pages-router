import { TComment } from '@/types';

import styles from './CommentList.module.scss';

const CommentList: React.FC<{ comments: TComment[] }> = ({ comments }) => {
  return (
    <ul className={styles.comments}>
      {comments.map(({ id, name, text }) => (
        <li key={id}>
          <p>{text}</p>
          <div>
            By <address>{name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
