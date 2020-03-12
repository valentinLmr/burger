import React, { Component } from 'react'
import Order from '../../../components/Order/Order'
import axios from '../../../axios-order';
class Orders extends Component {

    state = {
        orders:[],
        loading:true
    }
    componentDidMount(){
        axios.get('/orders.json')
        .then(res => {
            const fetchOrder = []
            for(let key in res.data) {
                fetchOrder.push({...res.data[key], id:key})
            }
            this.setState({loading: false, orders: fetchOrder})
        })

    }
    render(){
        let Ord = ( this.state.orders.map(order =>(
            <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
        ))

        )
        return(
            <div>
               {Ord}
            </div>
        )
    }
}

export default Orders