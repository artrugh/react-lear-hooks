import { useReducer, useCallback } from 'react'

const initialState = {
    loading: false,
    error: null,
    data: null,
    extra: null,
    identifer: null
}

const httpReducer = (curHttpState, action) => {
    switch (action.type) {
        case 'SEND':
            return { loading: true, error: null, data: null, extra: null, identifer: action.identifer };
        case 'RESPONSE':
            return { ...curHttpState, loading: false, data: action.data, extra: action.extra };
        case 'ERROR':
            return { loading: false, error: 'something went wrong' };
        case 'CLEAR':
            return { initialState };
        default:
            throw new Error('Should not be reached!');
    }
};


const useHttp = () => {

    const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

    const clear = useCallback(() => dispatchHttp({ type: 'CLEAR'}), [])

    const sendRequest = useCallback((url, method, body, extra, identifer) => {
        dispatchHttp({ type: 'SEND', identifer: identifer });
        
        fetch(url, {
            method: method,
            body: body,
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                return res.json()
            })
            .then(resData => {
                dispatchHttp({ type: 'RESPONSE', data: resData, extra: extra })
            })
            .catch(err => {
                dispatchHttp({ type: 'ERROR' });

            })
    }, [])

    return [httpState, sendRequest, clear]

};

export default useHttp;