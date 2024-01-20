import { useState } from 'react';

import CommentList from './CommentList';
import NewComment from './NewComment';

import styles from './Comments.module.scss';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Comments: React.FC<{ id: string }> = ({ id }) => {
  // const { eventId } = props;

  const [showComments, setShowComments] = useState(false);

  const toggleCommentsHandler = () => {
    setShowComments(prevStatus => !prevStatus);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const addCommentHandler = (commentData: any) => {
    // send data to API
  };

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList />}
    </section>
  );
};

export default Comments;
