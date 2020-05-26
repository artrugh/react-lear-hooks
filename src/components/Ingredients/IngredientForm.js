import React, { useState, useEffect, memo } from 'react';

import Card from '../UI/Card';
import LoadingIndicator from './../UI/LoadingIndicator'
import './IngredientForm.css';

const IngredientForm = memo(props => {

  const [inputState, setInputState] = useState({ title: '', amount: '' });

  console.log('RENDERING FORM BEFORE');
  useEffect(() => {
    console.log('RENDERING FORM');
  });

  const submitHandler = event => {
    event.preventDefault();
    props.addIngredientHandler(inputState)
  };


  const onChangeHandler = (e, inputName) => {
    const newValue = e.target.value;
    setInputState((prevState) => ({
      ...prevState,
      [inputName]: newValue
    }))
  }

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={inputState.title}
              onChange={e => onChangeHandler(e, 'title')}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={inputState.amount}
              onChange={e => onChangeHandler(e, 'amount')}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
