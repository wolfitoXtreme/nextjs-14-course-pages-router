import { TPost } from '@/types';

import PostItem from './PostItem';

import styles from './PostGrid.module.scss';

const PostGrid: React.FC<{ posts: TPost[] }> = ({ posts }) => {
  return (
    <ul className={styles.grid}>
      {posts.map((post, index) => (
        <PostItem key={index} post={post} />
      ))}
    </ul>
  );
};

export default PostGrid;
