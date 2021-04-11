import * as types from '../actions/auth/types';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const authStart = state => {
    return {
        ...state,
        error: null,
        loading: true
    };
};

const authSuccess = (state, action) => {
    return  {
        ...state,
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false
     };
};

const authFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false
    };
};

const authLogout = state => {
    return {
        ...state,
        token: null, 
        userId: null
    }
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.AUTH_START: 
            return authStart(state, action);
        case types.AUTH_SUCCESS: 
            return authSuccess(state, action);
        case types.AUTH_FAIL: 
            return authFail(state, action);
        case types.AUTH_LOGOUT: 
            return authLogout(state, action);
        default:
            return state;
    }
};

export default reducer;