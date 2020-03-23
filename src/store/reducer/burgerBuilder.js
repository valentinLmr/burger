
import * as actionTypes from '../action/actionTypes' ;


const initialState = {
    ingredients: null,
    totalPrice: 4,
    building: false
}

const INGREDIENTPRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}


const reducer = (state = initialState, action) => { 
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTPRICE[action.ingredientName],
                building:true

            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTPRICE[action.ingredientName],
                building: true
            }; 
        case actionTypes.SET_INGREDIENTS: 
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 4,
                building: false
            };
        default:
            return state;       
    }
};

export default reducer;