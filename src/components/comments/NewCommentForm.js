import { useEffect, useState } from 'react';

import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
  const [enteredComment, setEnteredComment] = useState('');

  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment, quoteId } = props;

  useEffect(() => {
    if (status === 'completed' && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment])

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (enteredComment.trim().length === 0) {
      return;
    }

    sendRequest({ commentData: { text: enteredComment }, quoteId });
  };

  const onChangeCommentHandler = (event) => {
    setEnteredComment(event.target.value)
  }

  const isButtonDisabled = enteredComment.trim().length === 0;

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'pending' &&
        <div className="centered">
          <LoadingSpinner />
        </div>
      }
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea
          id='comment'
          rows='5'
          onChange={onChangeCommentHandler}
          value={enteredComment}
        ></textarea>
      </div>
      <div className={classes.actions}>
        <button
          disabled={isButtonDisabled}
          className={isButtonDisabled ? 'btn--disabled' : 'btn'}>
          Add Comment
        </button>
      </div>
    </form>
  );
};

export default NewCommentForm;
