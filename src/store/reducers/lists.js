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

const editList = (state, action) => {
    const { list } = action;
    const lists = [...state.lists];

    const targetIndex = lists.findIndex(el => el.id === list.id);

    lists[targetIndex].title = list.title;

    return {
        ...state,
        lists
    }
};

const deleteList = (state, action) => {
    const { listId } = action;
    const lists = [...state.lists];

    const targetIndex = lists.findIndex(el => el.id === listId);
    
    lists.splice(targetIndex, 1);

    return {
        ...state,
        lists
    };
};




const createListItem = (state, action) => {

    const { listId, listItem } = action;

    const lists = [...state.lists];

    const targetIndex = lists.findIndex(el => el.id === listId);

    if (!lists[targetIndex].items) lists[targetIndex].items = [];

    lists[targetIndex].items.push({
        ...listItem
    });

    return {
        ...state,
        lists
    }
};

const editListItem = (state, action) => {
    const { listId, itemId, heading, status, description } = action;

    const lists = [...state.lists];

    const targetListIndex = lists.findIndex(el => el.id === listId);

    const items = [...lists[targetListIndex].items];

    const targetListItemIndex = items.findIndex(el => el.id === itemId);


    items[targetListItemIndex].heading = heading;
    items[targetListItemIndex].description = description;
    items[targetListItemIndex].status = status;

    lists[targetListIndex].items = items;

    return {
        ...state,
        lists
    }
};


const deleteListItem = (state, action) => {
    const { listId, listItemId } = action;
    const lists = [...state.lists];

    const targetListIndex = lists.findIndex(el => el.id === listId);

    const items = [...lists[targetListIndex].items];

    const targetListItemIndex = items.findIndex(el => el.id === listItemId);
    items.splice(targetListItemIndex,1);

    lists[targetListIndex].items = items;

    return {
        ...state,
        lists
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
        case types.LIST_EDIT_SUCCESS:
            return editList(state, action);
        case types.LIST_ITEM_EDIT_SUCCESS:
            return editListItem(state, action);
        default:
            return state;
    }
};

export default reducer;