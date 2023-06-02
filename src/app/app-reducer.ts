const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setStatusAC = (status: 'idle' | 'loading' | 'succeeded' | 'failed') =>
    ({type: 'APP/SET-STATUS', status} as const)


// types
type SetErrorType = ReturnType<typeof setErrorAC>
type SetStatusType = ReturnType<typeof setStatusAC>

export type InitialStateType = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

type ActionType =
    | SetErrorType
    | SetStatusType