import * as actionTypes from '../action/actionTypes';
import { updateObj } from '../utility';


const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authStart = (state, action) => {
    return  updateObj(state, {error: null, loading: true})
}
const authSuccess = (state, action) => {
    return  updateObj(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    })
}
const authFail = (state, action) => {
    return  updateObj(state, {error: action.error, loading: false})
}
const authgLogOut = (state,action) => {
    return updateObj(state, {token: null, userId: null})
}


const setAuthRedirect = (state,action) => {
    return updateObj(
        state, {
        authRedirectPath: action.path
    })
}
const reducer = (state= initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);  
        case actionTypes.AUTH_FAIL: return authFail(state,action);
        case actionTypes.AUTH_LOGOUT: return authgLogOut(state, action);
        case actionTypes.SET_AUTH_REDIRECT: return setAuthRedirect(state, action);
        default: return state;
    }  
}



export default reducer;