import React, { Component } from 'react'
import { connect } from 'react-redux'
import Order from '../../../components/Order/Order'
import * as action from '../../../store/action/index'
import Spinner from '../../../components/UI/Spiner/Spiner'
class Orders extends Component {

   
    componentDidMount(){
        this.props.onFetchOrders(this.props.token, this.props.userId)

    }
    render(){
        let order = <Spinner/>

        if (!this.props.loading) {
            order =  this.props.orders.map(order =>
                ( <Order key={order.id} 
                    ingredients={order.ingredients}
                    price={order.price}/>
                )
            )
        }
        return(
            <div>
               {order}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
            orders: state.order.order,
            loading: state.order.loading,
            token: state.auth.token,
            userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(action.fetchOrder(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)