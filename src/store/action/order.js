import * as actionTypes  from './actionTypes';
import axios from '../../axios-order'

export const purchasesBurgerSuccess = (id, orderData) => {
    return { 
        type: actionTypes.PURCHASES_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData )
            .then(response => {
                dispatch(purchasesBurgerSuccess(response.data.name, orderData))
        });  
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASES_BURGER_START
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
    
};

export const fetchOrderInit = () => {
    return {
        type: actionTypes.FETCH_ORDER_INIT
    }
    
}

export const fetchOrder = (token, userId) => {
    return (dispatch) => {
        dispatch(fetchOrderInit());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        axios.get('/orders.json' + queryParams)
        .then(res => {
            const fetchOrder = []
            for(let key in res.data) {
                fetchOrder.push({...res.data[key], id:key})
            }
            dispatch(fetchOrderSuccess(fetchOrder))
        })
    }
}