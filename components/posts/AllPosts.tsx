import { TPost } from '@/types';

import PostGrid from './PostGrid';

import styles from './AllPosts.module.scss';

const AllPosts: React.FC<{ posts: TPost[] }> = ({ posts }) => (
  <section className={styles.posts}>
    <h1>All Posts</h1>
    <PostGrid posts={posts} />
  </section>
);

export default AllPosts;
