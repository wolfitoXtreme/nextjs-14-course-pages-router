import { useEffect, useState } from 'react';

import { EnumRequestMethod, TComment } from '@/types';

import CommentList from './CommentList';
import NewComment from './NewComment';

import styles from './Comments.module.scss';

const Comments: React.FC<{ id: string }> = ({ id }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<TComment[]>([]);

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${id}`)
        .then(response => response.json())
        .then(data => {
          setComments(data.comments as TComment[]);
        });
    }
  }, [id, showComments]);

  const toggleCommentsHandler = () => {
    setShowComments(prevStatus => !prevStatus);
  };

  const addCommentHandler = (commentData: Omit<TComment, 'id'>) => {
    fetch(`/api/comments/${id}`, {
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
      method: EnumRequestMethod.POST,
    })
      .then(response => response.json())
      // eslint-disable-next-line no-console
      .then(data => console.log({ data }));
  };

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
};

export default Comments;
