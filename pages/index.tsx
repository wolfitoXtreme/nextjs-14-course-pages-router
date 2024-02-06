import Head from 'next/head';
import { GetStaticProps } from 'next/types';

import { TPost } from '@/types';
import { getFeaturedPosts } from '@/utils/api';

import FeaturedPosts from '@/components/homePage/FeaturedPosts';
import Hero from '@/components/homePage/Hero';

const Homepage = ({ posts }: { posts: TPost[] }) => {
  return (
    <>
      <Head>
        <title>Welcome to my blog</title>
        <meta name="description" content="I post Lorem Lorem" />
      </Head>
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
