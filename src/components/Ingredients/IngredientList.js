import React, {memo, useEffect} from 'react';

import './IngredientList.css';

const IngredientList = memo(props => {
  console.log('RENDERING LIST BEFORE');
  useEffect(() => {
    console.log('RENDERING LIST');
  });
  
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map(ig => (
          <li key={ig.id}
            onClick={() => props.removeIngredientHandler(ig.id)}>
            <span>{ig.title}</span>
            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
});

export default IngredientList;
