import { act } from 'react-dom/test-utils';
import * as types from '../actions/activeList/types';

const initialState = {
    id: '',
    title: '',
    items: [],
    error: null,
    loading: false
};

const createStart = state => {
    return {
        ...state,
        error: null,
        loading: true
    };
};

const createSuccess = (state, action) => {
    return  {
        ...state,
        token: action.id,
        title: action.title,
        items: [],
        error: null,
        loading: false
     };
};

const createFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false
    };
};



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_CREATE_START: 
            return createStart(state, action);
        case types.LIST_CREATE_SUCCESS: 
            return createSuccess(state, action);
        case types.LIST_CREATE_FAIL: 
            return createFail(state, action);
        default:
            return state;
    }
};

export default reducer;