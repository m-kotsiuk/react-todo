import * as types from './types';
import axios from 'axios';
import { FIREBASE_DB_URL } from '../../../config';

export const createStart = () => {
    return {
        type: types.LIST_CREATE_START
    };
};


export const createSuccess = () => {

};

export const createFailed = () => {

};


export const createList = (title, userId) => {

    axios
        .post(`${FIREBASE_DB_URL}lists.json`, {
            title,
            userId
        })
        .then(resp => {
            console.log(resp);
        })
        .catch(err => {
            console.log(err);
        });
};