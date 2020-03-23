import * as actionTypes from './actionTypes';
import axios from 'axios'
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    localStorage.removeItem('userId')

    return{
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const checkAuthTimeOut = (expireTime) => {
     return dispatch => {
         setTimeout(()=> {
             dispatch(logOut())
         }, expireTime * 1000)
     }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true

        };
        

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB06i0WSvSPt62TwTGHS2IMWZNd5vZUp6U'
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB06i0WSvSPt62TwTGHS2IMWZNd5vZUp6U'

            
        }
        axios.post(url, authData)
        .then (resp => {
            const expirationTime = new Date(new Date().getTime()+ resp.data.expiresIn * 1000)
            localStorage.setItem('token', resp.data.idToken);
            localStorage.setItem('expirationTime', expirationTime)
            localStorage.setItem('userId', resp.data.localId)
            dispatch(authSuccess(resp.data.idToken, resp.data.localId));
            dispatch(checkAuthTimeOut(resp.data.expiresIn));
        }) 
        .catch(err => {
            dispatch(authFail(err.response.data.error))
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
         if(!token) {
             dispatch(logOut())
         } else {
             const expirationTime = new Date(localStorage.getItem('expirationTime'));
             if (expirationTime <= new Date()){
                 dispatch(logOut())
             }else{
                 const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeOut((expirationTime.getTime() - new Date()) / 1000 ))
             }
         }

    }
}

export const redirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    }
}