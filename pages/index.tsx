import { GetStaticProps } from 'next/types';

import { TPost } from '@/types';
import { getFeaturedPosts } from '@/utils/api';

import FeaturedPosts from '@/components/homepage/FeaturedPosts';
import Hero from '@/components/homepage/Hero';

const Homepage = ({ posts }: { posts: TPost[] }) => {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const posts = getFeaturedPosts();

  return {
    props: {
      posts,
    },
    // will retrieve data again after given timeout (otherwise data will be static until rebuild)
    // revalidate: 1800,
    // revalidate not defined means, it will never be regenerated after deployment
  };
};

export default Homepage;
