import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next/types';

import { ParsedUrlQuery } from 'querystring';

import { TPost } from '@/types';
import { getPostData, getPostFiles } from '@/utils/api';

import PostContent from '@/components/posts/post-detail/PostContent';

const PostDetailPage = ({ post }: { post: TPost }) => {
  const { excerpt, title } = post;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={excerpt} />
      </Head>
      <PostContent post={post} />
    </>
  );
};

export const getStaticProps: GetStaticProps = context => {
  const { params } = context;
  const { slug } = params as ParsedUrlQuery;

  const post = slug ? getPostData(slug as string) : {};

  return {
    props: {
      post,
    },
    revalidate: 600,
  };
};

// this is a dynamic page [...x], then need to specify which paths will be pre-rendered
export const getStaticPaths: GetStaticPaths = () => {
  const postFileNames = getPostFiles();
  const filePaths = postFileNames.map(slug => ({ params: { slug } }));

  return {
    fallback: false, // TODO - true fails apparently because data filesystem usage
    paths: filePaths,
  };
};

export default PostDetailPage;
