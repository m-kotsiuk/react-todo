import * as types from './types';
import axios from 'axios';
import { FIREBASE_API_KEY } from '../../../config';

export const authStart = () => {
    return {
        type: types.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: types.AUTH_SUCCESS,
        token,
        userId
    };
};

export const authFail = err => {
    return {
        type: types.AUTH_FAIL,
        error: err
    };
};


export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: types.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, signupMode) => {
    return dispatch => {

        dispatch(authStart());

        const data = {
            email,
            password,
            returnSecureToken: true
        };

        const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${ signupMode ? 'signupNewUser' : 'verifyPassword' }?key=${FIREBASE_API_KEY}`;

        axios.post(url, data)
            .then(response => {
                const { idToken, localId, expiresIn } = response.data;
                const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
                localStorage.setItem('token', idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', localId);
                dispatch(authSuccess(idToken, localId));
                dispatch(checkAuthTimeout(expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const check = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};