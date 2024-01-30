import ReactMarkdown from 'react-markdown';

import PostHeader from './PostHeader';

import styles from './PostContent.module.scss';

const DUMMY_POST = {
  content: '# This is a first post',
  date: '2024-02-10',
  image: 'getting-started-with-nextjs',
  slug: 'getting-started-with-nextjs',
  title: 'Getting Started with NextJS',
};

const PostContent = () => (
  <article className={styles.content}>
    <p>{`/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`}</p>
    <PostHeader
      title={DUMMY_POST.title}
      image={`/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`}
    />
    <ReactMarkdown>{DUMMY_POST.content}</ReactMarkdown>
  </article>
);

export default PostContent;
