import React, { 
  useState, 
  useEffect, 
  useRef, 
  memo } from 'react';

import './Search.css';

import ErrorModal from './../UI/ErrorModal'

import { useStore } from './../../hooksStore/store'

const Search = memo(({dispatchHttp, clean}) => {

  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef()

  const state = useStore()[0]
  
  // console.log('RENDERING SEARCH BEFORE');
  // useEffect(() => {
  //   console.log('RENDERING SEARCH');
  // });

  useEffect(() => {
    const fetchData = () => {
      const query =
        enteredFilter.length === 0
          ? ''
          : `?orderBy="title"&equalTo="${enteredFilter}"`
      dispatchHttp(
        'https://react-hooks-4782a.firebaseio.com/ingredients.json' + query,
        'GET',
        null,
        null,
        'SET')
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

  return (
    <section className="search">
      {state.error && (
        <ErrorModal onClose={clean}>{state.error}</ErrorModal>)}
      <div className="card">
        <div className="search-input">
          <label>Filter by Title</label>
          {state.loading && <p style={{ margin: 0 }}>loading...</p>}
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={e => setEnteredFilter(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
});

export default Search;
