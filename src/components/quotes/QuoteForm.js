import { useState } from 'react';
import { Prompt } from 'react-router-dom';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

const QuoteForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);
  const [enteredAuthor, setEnteredAuthor] = useState('');
  const [enteredText, setEnteredText] = useState('');
  const [errors, setErrors] = useState({
    authorInput: false,
    textInput: false
  });

  console.log(errors);

  function submitFormHandler(event) {
    event.preventDefault();

    if (enteredAuthor.trim().length === 0) {
      setErrors(prevState => ({ ...prevState, authorInput: true }));
      return;
    }

    if (enteredText.trim().length === 0) {
      setErrors(prevState => ({ ...prevState, textInput: true }));
      return;
    }

    setIsEntering(false);
    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  const onChangeAuthorHandler = (event) => {
    setEnteredAuthor(event.target.value);
    setErrors(prevState => ({ ...prevState, authorInput: false }));
    setIsEntering(true);
  }
  const onChangeTextHandler = (event) => {
    setEnteredText(event.target.value);
    setErrors(prevState => ({ ...prevState, textInput: false }));
    setIsEntering(true);
  }

  return (
    <>
      <Prompt
        when={isEntering}
        message={(location) => (
          `Are you sure you want to live? All your entered data will be lost.`
        )}
      />
      <Card>
        <form
          className={classes.form} onSubmit={submitFormHandler}>

          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor='author'>Author</label>
            <input
              type='text'
              id='author'
              className={errors.authorInput ? 'error' : ''}
              value={enteredAuthor}
              onChange={onChangeAuthorHandler}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='text'>Text</label>
            <textarea
              id='text'
              rows='5'
              className={errors.textInput ? 'error' : ''}
              value={enteredText}
              onChange={onChangeTextHandler}>
            </textarea>
          </div>
          <div className={classes.actions}>
            <button className='btn'>Add Quote</button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default QuoteForm;
