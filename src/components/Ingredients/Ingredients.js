import React, { useEffect, useCallback, useReducer, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import ErrorModal from './../UI/ErrorModal'
import Search from './Search';
import useHttp from './../../hooks/http'

const ingredientsReducer = (ingredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients
    case 'ADD':
      return [...ingredients, action.ingredients]
    case 'REMOVE':
      return ingredients.filter(ing => ing.id !== action.id)
    default: throw new Error('Should not be there')
  }
}

const Ingredients = () => {

  const [ingredients, dispatch] = useReducer(ingredientsReducer, [])
  const [httpState, dispatchHttp, clear] = useHttp();

  console.log('RENDERING INGREDIENTS BEFORE');
  useEffect(() => {
    console.log('RENDERING INGREDIENTS');
  });


  useEffect(() => {
    if (!httpState.error && !httpState.loading && httpState.identifer === 'REMOVE') {
      dispatch({ type: 'REMOVE', id: httpState.extra })
    } else if (!httpState.error && !httpState.loading && httpState.identifer === 'ADD') {
      dispatch({ type: 'ADD', ingredients: { id: httpState.data.name, ...httpState.extra } })
    }
  }, [httpState.error, httpState.loading, httpState.data, httpState.identifer, httpState.extra]);

  const addIngredientHandler = useCallback(ingredient => {
    dispatchHttp(`https://react-hooks-4782a.firebaseio.com/ingredients.json`,
      'POST',
      JSON.stringify(ingredient),
      ingredient,
      'ADD'
    );
  }, [dispatchHttp])

  const removeIngredientHandler = useCallback(ingredientId => {
    dispatchHttp(`https://react-hooks-4782a.firebaseio.com/ingredients/${ingredientId}.json`,
      'DELETE',
      null,
      ingredientId,
      'REMOVE'
    );
  }, [dispatchHttp])

  const filteredIngredientsHandler = useCallback(filteredIng => { 
    dispatch({ type: 'SET', ingredients: filteredIng })
  }, [])

  const ingredientList = useMemo(() => (
    <IngredientList
      ingredients={ingredients}
      removeIngredientHandler={removeIngredientHandler} />
  ), [ingredients, removeIngredientHandler])

  return (
    <div className="App">

      {httpState.error && (
        <ErrorModal onClose={clear}>{httpState.error}</ErrorModal>)}
      <IngredientForm
        loading={httpState.loading}
        addIngredientHandler={addIngredientHandler} />

      <section>
        <Search
          filteredIngredientsHandler={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
