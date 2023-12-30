import { useRouter } from 'next/router';

const BlogPostPage = () => {
  const { query } = useRouter();

  return (
    <div>
      <h1>The Blg Posts</h1>
      <pre>{JSON.stringify(query, null, 2)}</pre>
    </div>
  );
};

export default BlogPostPage;
