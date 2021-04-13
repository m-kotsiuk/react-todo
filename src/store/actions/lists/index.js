import * as types from './types';
import axios from 'axios';
import { FIREBASE_DB_URL } from '../../../config';

const fetchListsSuccess = lists => {
    return {
        type: types.LISTS_FETCH_SUCCESS,
        lists
    }
};

const fetchListsFailed = () => {
    return {
        type: types.LISTS_FETCH_FAILED
    }
};

const createListSuccess = list => {
    return {
        type: types.LIST_CREATE_SUCCESS,
        list
    }
};

const createListFailed = () => {
    return {
        type: types.LIST_CREATE_FAILED
    }
};


const editListSuccess = list => {
    return {
        type: types.LIST_EDIT_SUCCESS,
        list
    }
};

const editListFailed = () => {
    return {
        type: types.LIST_EDIT_FAILED
    }
};



const deleteListSuccess = listId => {
    return {
        type: types.LIST_DELETE_SUCCESS,
        listId
    }
};

const deleteListFailed = () => {
    return {
        type: types.LIST_DELETE_FAILED
    }
};

const createListItemSuccess = payload => {
    const {listId, listItem} = payload;
    return {
        type: types.LIST_ITEM_CREATE_SUCCESS,
        listId,
        listItem
    }
};

const editListItemSuccess = payload => {

    return {
        type: types.LIST_ITEM_EDIT_SUCCESS,
        ...payload
    };
};

const editListItemFailed = () => {
    return {
        type: types.LIST_ITEM_EDIT_FAILED
    };
};

const createListItemFailed = () => {
    return {
        type: types.LIST_ITEM_CREATE_FAILED,
    }
};

const deleteListItemSuccess = payload => {
    const {listId, listItemId} = payload; 
    return {
        type: types.LIST_ITEM_DELETE_SUCCESS,
        listId,
        listItemId
    }
};

const deleteListItemFailed = () => {
    return {
        type: types.LIST_ITEM_DELETE_FAILED,
    }
};


export const createListItem = (userId, accessToken, listId, params, history) => {
    return dispatch => {
        axios
        .post(`${FIREBASE_DB_URL}lists/${userId}/${listId}/items.json?auth=${accessToken}`, params)
        .then(resp => {
            dispatch(createListItemSuccess({
                listId,
                listItem: {
                    id: resp.data.name,
                    ...params
                }
            }));
            
            history.push('/list/' + listId);
        })
        .catch(() => {
            dispatch(createListItemFailed());
            history.push('/');
        });
    }

};

export const editListItem = (userId, accessToken, listId, itemId, params, history) => {
    return dispatch => {
        axios
            .put(`${FIREBASE_DB_URL}lists/${userId}/${listId}/items/${itemId}.json?auth=${accessToken}`, {
                ...params
            })
            .then(() => {
               history.push('/list/' + listId);
               dispatch(editListItemSuccess({
                   listId,
                   itemId,
                   ...params
               }));
            })
            .catch(( )=> {
                dispatch(editListItemFailed());
            });
    }

};


export const createList = (userId, accessToken, title, history) => {
    return dispatch => {
        axios
            .post(`${FIREBASE_DB_URL}lists/${userId}.json?auth=${accessToken}`, {
                title,
                userId
            })
            .then(resp => {
                dispatch(createListSuccess({
                    id: resp.data.name,
                    title,
                    userId,
                    items: null
                }));

                history.push('/');
            })
            .catch(() => {
                dispatch(createListFailed());
                history.push('/');
            });
    }
    
};

export const editList = (userId, accessToken, id, title, history) => {
    return dispatch => {
        axios
            .patch(`${FIREBASE_DB_URL}lists/${userId}/${id}.json?auth=${accessToken}`, {
                title
            })
            .then(() => {
                dispatch(editListSuccess({
                    id,
                    title
                }));

                history.push('/list/' + id);
            })
            .catch(() => {
               dispatch(editListFailed());
            });
    };
};


export const fetchLists = (userId, accessToken) => {
    return dispatch => {
        axios
            .get(`${FIREBASE_DB_URL}/lists/${userId}.json?auth=${accessToken}`)
            .then(resp => {
                const lists = [];

                Object.keys(resp.data).forEach(key => {
                    const obj = {...resp.data[key]};
                    obj.id = key;

                    if (obj.items) {
                        const items = [];

                        Object.keys(obj.items).forEach(itemKey => {
                            const itemObj = {...obj.items[itemKey]};
                            itemObj.id = itemKey;
                            items.push(itemObj);
                        });

                        obj.items = items;
                    }

                    lists.push(obj);
                });
                lists.reverse();

                dispatch(fetchListsSuccess(lists));
            })
            .catch(() => {
                dispatch(fetchListsFailed());
            });
        }
}


export const deleteList = (userId, accessToken, listId, history) => {
    return dispatch => {
        axios
            .delete(`${FIREBASE_DB_URL}/lists/${userId}/${listId}.json?auth=${accessToken}`)
            .then(() => {
                dispatch(deleteListSuccess(listId));
                history.push('/');
            })
            .catch(() => {
                dispatch(deleteListFailed());
            });
    };
};


export const deleteListItem = (userId, accessToken, listId, listItemId) => {
    return dispatch => {
        axios
            .delete(`${FIREBASE_DB_URL}lists/${userId}/${listId}/items/${listItemId}.json?auth=${accessToken}`)
            .then(() => {
                dispatch(deleteListItemSuccess({listId, listItemId}));
            })
            .catch(() => {
                dispatch(deleteListItemFailed());
            });
    };
};