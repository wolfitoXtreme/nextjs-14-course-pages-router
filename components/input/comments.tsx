import { useContext, useEffect, useState } from 'react';

import { EnumNotificationStatus, EnumRequestMethod, TComment } from '@/types';

import { NotificationContext } from '@/context/NotificationContext';

import CommentList from './CommentList';
import NewComment from './NewComment';

import styles from './Comments.module.scss';

const Comments: React.FC<{ id: string }> = ({ id }) => {
  const { showNotification } = useContext(NotificationContext);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<TComment[]>([]);
  const [fetchingComments, setFetchingComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      setFetchingComments(true);
      fetch(`/api/comments/${id}`)
        .then(response => {
          // all fine return response
          if (response.ok) {
            return response.json();
          }

          // something fails, use a promise chain to throw an error
          return response.json().then(data => {
            throw new Error(data.message || 'Something went wrong!');
          });
        })
        .then(data => {
          setComments(data.comments as TComment[]);
          setFetchingComments(false);
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.warn('server error', { error });
        });
    }
  }, [id, showComments]);

  const toggleCommentsHandler = () => {
    setShowComments(prevStatus => !prevStatus);
  };

  const addCommentHandler = (commentData: Omit<TComment, '_id'>) => {
    showNotification({
      message: 'Adding comment...',
      status: EnumNotificationStatus.PENDING,
      title: 'Adding a comment',
    });

    fetch(`/api/comments/${id}`, {
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
      method: EnumRequestMethod.POST,
    })
      .then(response => {
        // all fine return response
        if (response.ok) {
          return response.json();
        }

        // something fails, use a promise chain to throw an error
        return response.json().then(data => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      .then(data => {
        // eslint-disable-next-line no-console
        console.log('received data', { data });
        showNotification({
          message: 'Success!',
          status: EnumNotificationStatus.SUCCESS,
          title: 'Successfully added comment',
        });
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.warn('server error', { error });
        showNotification({
          message: error.message ?? 'Something went wrong!',
          status: EnumNotificationStatus.ERROR,
          title: 'Error!',
        });
      });
  };

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && (
        <>
          <h3>Comments for event {id}:</h3>
          {fetchingComments && (
            <div>
              <b>Comments loading...</b>
            </div>
          )}
          <CommentList comments={comments || []} />
        </>
      )}
    </section>
  );
};

export default Comments;
