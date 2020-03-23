 import * as actionTypes from '../action/actionTypes';
const initialState = {
    order: [],
    loading: false,
    purchased: false
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASES_BURGER_START:
            return {
                ...state,
                loading:true
            }
        case actionTypes.PURCHASES_BURGER_SUCCESS:

            const newOrder = { 
            ...action.orderData,
            id: action.orderId
            }
            return {
                ...state, 
                loading: false,
                order: state.order.concat(newOrder),
                purchased: true
            }
            case actionTypes.FETCH_ORDER_INIT:
             return {
                 ...state,
                 loading: true
            }

            case actionTypes.FETCH_ORDER_SUCCESS:
                return {
                    ...state,
                    order: action.orders,
                    loading: false
                }

        default:
            return state
    }
}

 export default reducer