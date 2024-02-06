import Image from 'next/image';
import { ElementType } from 'react';
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';

import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';

import { TPost } from '@/types';

import PostHeader from './PostHeader';

import styles from './PostContent.module.scss';

SyntaxHighlighter.registerLanguage('js', js);

const PostContent: React.FC<{ post: TPost }> = ({
  post: { image, slug, text, title },
}) => {
  const components: { [nodeType: string]: ElementType } = {
    code(code) {
      const { children, className } = code;
      const language = className.split('-')[1]; // className is something like language-js => We need the "js" part here

      return (
        <SyntaxHighlighter
          style={atomDark}
          language={language}
          className="testClass">
          {children}
        </SyntaxHighlighter>
      );
    },

    p: paragraph => {
      const { node } = paragraph;

      // all images are rendered inside a paragraph by MarkDown...
      if (node.children[0].tagName === 'img') {
        const {
          properties: { src },
        } = node.children[0];

        return (
          <div className={styles.image}>
            <Image
              src={`/images/posts/${slug}/${src}`}
              alt=""
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },
  };

  return (
    <article className={styles.content}>
      <PostHeader title={title} image={`/images/posts/${slug}/${image}`} />
      <ReactMarkdown components={components}>{text}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
