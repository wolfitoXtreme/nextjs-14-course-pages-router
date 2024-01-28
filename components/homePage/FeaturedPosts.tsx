import { TPost } from '@/types';

import PostGrid from '@/components/posts/PostGrid';

import styles from './FeaturedPosts.module.scss';

const FeaturedPosts: React.FC<{ posts: TPost[] }> = ({ posts }) => {
  return (
    <section className={styles.latest}>
      <h2>Featured Post</h2>
      <PostGrid posts={posts} />
    </section>
  );
};

export default FeaturedPosts;
