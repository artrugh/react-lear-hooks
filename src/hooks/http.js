import {
    useCallback,
    useEffect
} from 'react';

import { useStore } from './../hooksStore/store'

const useHttp = () => {

    const dispatch = useStore(false)[1]
    const state = useStore()[0]

    const clean = useCallback(() => dispatch('CLEAN'), [dispatch])

    const sendRequest = useCallback((url, method, body, ingredient, identifer) => {

        dispatch('SEND', identifer)

        fetch(url, {
            method: method,
            body: body,
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                return res.json()
            })
            .then(resData => {
                dispatch('RESPONSE', { response: resData, ingredient: ingredient })

            })
            .catch(err => {
                dispatch('ERROR')
            })

    }, [dispatch])

    useEffect(() => {

        if (!state.error && !state.loading && state.identifer === 'REMOVE') {

            dispatch('REMOVE', state.ingredient)

        } else if (!state.error && !state.loading && state.identifer === 'ADD') {

            dispatch('ADD', {
                id: state.response.name,
                ...state.ingredient
            })

        } else if (!state.error && !state.loading && state.identifer === 'SET') {

            const resData = state.response
            const loadedIngredients = [];

            for (const key in resData) {

                loadedIngredients.push({
                    id: key,
                    title: resData[key].title,
                    amount: resData[key].amount
                })
            }
            dispatch('SET', loadedIngredients)
        }

    }, [
        state.error,
        state.loading,
        state.response,
        state.identifer,
        state.ingredient,
        dispatch]);

    return [sendRequest, clean]

};

export default useHttp;