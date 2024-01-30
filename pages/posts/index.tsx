import { GetStaticProps } from 'next/types';

import { TPost } from '@/types';
import { getAllPosts } from '@/utils/api';

import AllPosts from '@/components/posts/AllPosts';

const AllPostsPage = ({ posts }: { posts: TPost[] }) => {
  return <AllPosts posts={posts} />;
};

export const getStaticProps: GetStaticProps = () => {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
    // will retrieve data again after given timeout (otherwise data will be static until rebuild)
    // revalidate: 1800,
    // revalidate not defined means, it will never be regenerated after deployment
  };
};

export default AllPostsPage;
