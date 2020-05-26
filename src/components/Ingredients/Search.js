import React, { useState, useEffect, useRef, memo } from 'react';

import Card from '../UI/Card';
import './Search.css';
import useHttp from './../../hooks/http'
import ErrorModal from './../UI/ErrorModal'


const Search = memo(({ filteredIngredientsHandler }) => {

  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef()

  const [httpState, dispatchHttp, clear] = useHttp();

  console.log('RENDERING SEARCH BEFORE');
  useEffect(() => {
    console.log('RENDERING SEARCH');
  });

  useEffect(() => {
    const fetchData = () => {
      const query =
        enteredFilter.length === 0
          ? ''
          : `?orderBy="title"&equalTo="${enteredFilter}"`
      dispatchHttp(
        'https://react-hooks-4782a.firebaseio.com/ingredients.json' + query,
        'GET')
    }
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        fetchData()
      }
    }, 900)

    return () => {
      clearTimeout(timer)
    }

  }, [enteredFilter, dispatchHttp, inputRef]);

  useEffect(() => {

    if (!httpState.error && !httpState.loading && httpState.data) {

      const resData = httpState.data
      const loadedIngredients = [];
      for (const key in resData) {
        loadedIngredients.push({
          id: key,
          title: resData[key].title,
          amount: resData[key].amount
        })
      }

      filteredIngredientsHandler(loadedIngredients)
    }


  }, [httpState.data,
  httpState.loading,
  httpState.error,
    filteredIngredientsHandler])


  return (
    <section className="search">
      {httpState.error && (
        <ErrorModal onClose={clear}>{httpState.error}</ErrorModal>)}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {httpState.loading && <p style={{ margin: 0 }}>loading...</p>}
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={e => setEnteredFilter(e.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
