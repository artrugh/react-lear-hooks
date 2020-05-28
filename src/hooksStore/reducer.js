import { initStore } from './store';

const initialState = {
    loading: false,
    error: null,
    response: null,
    identifer: null,
    ingredient: null,
    isAuth: false,
    ingredients: []
}

const configStore = () => {

    const actions = {

        LOGIN: state => ({ ...state, isAuth: true }),

        // fetching data,

        SEND: (state, identifer) => ({
            ...state,
            loading: true,
            error: null,
            response: null,
            identifer: identifer
        }),

        RESPONSE: (state, payload) => ({
            ...state,
            loading: false,
            response: payload.response,
            ingredient: payload.ingredient
        }),

        ERROR: state => ({
            ...state,
            loading: false,
            error: 'something went wrong'
        }),

        CLEAN: (state) => ({
            ...initialState,
            isAuth: state.isAuth
        }),

        // managing ingredient

        SET: (state, ingredients) => ({
            ...state,
            ingredients: ingredients,
        }),

        ADD: (state, ingredient) => ({
            ...state,
            ingredients: [...state.ingredients, ingredient],

        }),

        REMOVE: (state, id) => {

            const newIngredients = state.ingredients
                .filter(ing => ing.id !== id)

            return { ...state, ingredients: newIngredients }
        }
    }

    initStore(actions, initialState)
}

export default configStore;