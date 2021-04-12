import * as types from '../actions/lists/types';

const initialState = {
    lists: null
};

const setLists = (state, action) => {
    const { lists } = action;

    return {
        ...state,
        lists
    }
};

const unsetLists = state => {
    return {
        ...state,
        lists: []
    };
};


const createList = (state, action) => {

    const lists = state.lists ? [action.list, ...state.lists] : [action.list];

    return {
        ...state,
        lists
    }
};

const deleteList = (state, action) => {

    return state;
};




const createListItem = (state, action) => {

    const lists = [...state.lists];

    const targetIndex = lists.findIndex(action.listId);

    if (!lists[targetIndex].items) lists[targetIndex].items = [];

    lists[targetIndex].items.push({
        ...action.listItem
    });

    return {
        ...state,
        lists
    }
};


const deleteListItem = (state, action) => {
    const {listId, itemId} = action;
    const lists = [...state.lists]
    const targetListIndex = lists.findIndex(el => el.id === listId);
    const items = [...lists[targetListIndex].items];
    const targetListItemIndex = items.findIndex(el => el.id === itemId);
    items.splice(targetListItemIndex,1);

    lists[targetListIndex][items] = items;

    return {
        state
    }
    
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LISTS_FETCH_SUCCESS:
            return setLists(state, action);
        case types.LISTS_FETCH_FAILED:
            return unsetLists(state);
        case types.LIST_CREATE_SUCCESS:
            return createList(state, action);
        case types.LIST_ITEM_CREATE_SUCCESS:
            return createListItem(state, action);
        case types.LIST_DELETE_SUCCESS:
            return deleteList(state, action);
        case types.LIST_ITEM_DELETE_SUCCESS:
            return deleteListItem(state, action);
        default:
            return state;
    }
};

export default reducer;