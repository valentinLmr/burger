import React, { Component } from 'react';
import Button from '../../../../components/UI/Button/Button';
import style from './ContactData.module.css';
import axios from '../../../../axios-order';

class ContactData extends Component {

    state = {
        name:'',
        email:'',
        address:{
            street:'',
            city:'',
            zipcode:''
        }
    } 
    orderHandler = (event) => {
        alert('You continue !');
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name:'valentin',
                addresse: {
                    street: "6 rue jean paul",
                    zipCode: '59830',
                    country: 'France'
                },
                email: 'valentin@gmail.com'    
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order )
            .then(response => {
            this.setState({loading: false})
        });  
        event.preventDefault();
        console.log(this.props.ingredients)
    }
    render () {
        return (
            <div className={style.ContactData}>
                <h4>Enter you contact Data</h4>
                <form>
                    <input type='text' name='name' placeholder='your Name'/>
                    <input type='email' name='email' placeholder='your Email'/>
                    <input type='text' name='city' placeholder='your City'/>
                    <input type='text' name='street' placeholder='your Street'/>
                    <input type='text' name='zipcode' placeholder='your Zipcode'/>
                    <Button clicked={this.orderHandler} buttonStyle={'Success'}>Order</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;