import * as actionTypes  from './actionTypes';
import axios from '../../axios-order'

export const purchasesBurgerSuccess = (id, orderData) => {
    return { 
        type: actionTypes.PURCHASES_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData )
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

export const fetchOrder = () => {
    return dispatch => {
        axios.get('/orders.json')
        .then(res => {
            const fetchOrder = []
            for(let key in res.data) {
                fetchOrder.push({...res.data[key], id:key})
            }
            dispatch(fetchOrderSuccess(fetchOrder))
        })
    }
}