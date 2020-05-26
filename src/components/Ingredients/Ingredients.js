import React, {
  useEffect,
  useCallback,
  useMemo
} from 'react';

import IngredientForm from './IngredientForm'
import IngredientList from './IngredientList'
import ErrorModal from './../UI/ErrorModal'
import Search from './Search'

import useHttp from './../../hooks/http'
import { useStore } from './../../hooksStore/store'


const Ingredients = () => {

  const [httpState, dispatchHttp, clear] = useHttp();

  const dispatchIng = useStore(false)[1]
  const state = useStore()[0]

  console.log('RENDERING INGREDIENTS BEFORE');
  useEffect(() => {
    console.log('RENDERING INGREDIENTS');
  });

  useEffect(() => {
    if (!httpState.error && !httpState.loading && httpState.identifer === 'REMOVE') {

      dispatchIng('REMOVE', httpState.extra)

    } else if (!httpState.error && !httpState.loading && httpState.identifer === 'ADD') {

      dispatchIng('ADD',
        { id: httpState.data.name, ...httpState.extra })
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
    dispatchIng('SET', filteredIng)
  }, [])

  const ingredientList = useMemo(() => (
    <IngredientList
      ingredients={state.ingredients}
      removeIngredientHandler={removeIngredientHandler} />
  ), [state.ingredients, removeIngredientHandler])

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
