import React, { Component } from 'react';
import Button from '../../../../components/UI/Button/Button';
import style from './ContactData.module.css';
import Spinner from '../../../../components/UI/Spiner/Spiner'
import axios from '../../../../axios-order';
import Input from '../../../../components/UI/Input/Input'

class ContactData extends Component {

    state = {
        name:'',
        email:'',
        address:{
            street:'',
            city:'',
            zipcode:''
        },
        loading:false
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
            this.props.history.push('/')
        });  
        event.preventDefault();
        console.log(this.props.ingredients)
    }
    render () {

        let form =
        <form>
            <Input inputtype='input' type='text' name='name' placeholder='your Name'/>
            <Input inputtype='input' type='email' name='email' placeholder='your Email'/>
            <Input inputtype='input' type='text' name='city' placeholder='your City'/>
            <Input inputtype='input' type='text' name='street' placeholder='your Street'/>
            <Input inputtype='input' type='text' name='zipcode' placeholder='your Zipcode'/>
            <Button clicked={this.orderHandler} buttonStyle={'Success'}>Order</Button>
        </form>

        if(this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={style.ContactData}>
                <h4>Enter you contact Data</h4>
               {form}
            </div>
        )
    }
}

export default ContactData;