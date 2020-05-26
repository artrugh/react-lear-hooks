
import { initStore } from './store';

const configStore = () => {

    const actions = {

        LOGIN: state => ({ ...state, isAuth: true }),

        SET: (state, ingredients) => ({ ...state, ingredients: ingredients }),

        ADD: (state, ingredient) => ({
            ...state,
            ingredients: [...state.ingredients, ingredient]
        }),

        REMOVE: (state, id) => {

            const newIngredients = state.ingredients
                .filter(ing => ing.id !== id)

            return { ...state, ingredients: newIngredients }
        }
    }

    initStore(actions, {
        isAuth: true,
        ingredients: []
    })
}

export default configStore;