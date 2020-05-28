import React, {
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

  const [dispatchHttp, clean] = useHttp();

  const state = useStore()[0]

  // console.log('RENDERING INGREDIENTS BEFORE');
  // useEffect(() => {
  //   console.log('RENDERING INGREDIENTS');
  // });

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


  const ingredientList = useMemo(() => (
    <IngredientList
      ingredients={state.ingredients}
      removeIngredientHandler={removeIngredientHandler} />
  ), [state.ingredients, removeIngredientHandler])

  return (
    <div className="App">

      {state.error && (
        <ErrorModal onClose={clean}>{state.error}</ErrorModal>)}
      <IngredientForm
        loading={state.loading}
        addIngredientHandler={addIngredientHandler} />

      <section>
        <Search
          dispatchHttp={dispatchHttp}
          clean={clean}
        />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
