import { useState, useEffect, useCallback } from 'react'

// GLOBAL VARIABLES
let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {

    // SECOND VALUE => FUCTION HOOK
    const setState = useState(globalState)[1]

    const dispatch = useCallback((actionType, payload) => {

        // ACTIONS ARE FUNCTION, SO THEY NEED ARGUMENTS (state = globalState, payload)
        const newState = actions[actionType](globalState, payload)
        // REWRITE THE GLOBAL STATE WITH THE NEW DATA
        globalState = { ...globalState, ...newState }
        // CALL EACH LISTENER DURING DISPATCHING TO UPDATE THE STATE
        listeners.forEach(listener => listener(globalState))

    }, [])

    // GONNA RERENDER WHEN THE STATE IS CALL / 1ST ARGUMENT
    useEffect(() => {
        // IF THE DISPATCH FUNCTION OR THE STATE HAS ANY ARGUMENT WHEN IT IS INVOLKED
        // THE DEFAULT VALUE TRUE IS PASSED, SO:
        // USUALLY THE STATE WILL SET IN TRUE - WE WANT TO RENDER THE HOOK TO UPDATE THE STATE
        // BUT DISPATCH WILL PASS FALSE AS AN ARG

        // EX:
        // const state = useStore()[0]
        // const dispatchIng = useStore(false)[1]

        if (shouldListen) {
            // STORE THE SETSTATE WHICH IS NOTHING MORE THAN A HOOK FUNTIONS
            listeners.push(setState);

            // CLEAN THE LISTENERS ARRAY FILTERING THOSE FUNCTIONS WHICH ARE NOT EQUAL TO SET STATE
           // return () => listeners = listeners.filter(li => li !== setState)

        }
    }, [setState, shouldListen])

    return [globalState, dispatch]
}

export const initStore = (userActions, initialState) => {

    if (initialState) {
        globalState = {
            ...globalState, ...initialState
        }
    }
    actions = { ...actions, ...userActions }
}