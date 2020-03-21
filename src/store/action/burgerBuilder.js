import * as actionTypes from './actionTypes';
import axios from '../../axios-order'


export const addIngredrient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredrient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIng = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const initIng = () => {
    return dispatch => {
        axios.get('/ingredients.json')
        .then(response => {
            dispatch(setIng(response.data))
        });
    }
}