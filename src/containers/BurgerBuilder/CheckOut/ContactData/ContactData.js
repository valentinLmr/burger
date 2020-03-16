import React, { Component } from 'react';
import Button from '../../../../components/UI/Button/Button';
import style from './ContactData.module.css';
import Spinner from '../../../../components/UI/Spiner/Spiner'
import axios from '../../../../axios-order';
import Input from '../../../../components/UI/Input/Input'

class ContactData extends Component {

    state = {
       orderForm: {
            name:{
                elementType:'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'your name'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type: 'email',
                    placeholder:'your email'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'your street'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            city:{
                elementType:'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'your city'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipcode:{
                elementType:'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'your zipcode'
                },
                value: '',
                validation:{
                    required:true,
                    minLength: 5
                },
                valid:false,
                touched:false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation:{},
                valid: true
            }
        },
        formIsValid: false,
        loading:false
    }

    checkValidity = (value, rules) => {
        
        let isValid = true
        if (!rules) {
            return true;
        }

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length === rules.minLength
        }
        return isValid
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const formData ={}
            for(let formElement in this.state.orderForm){
                formData[formElement] = this.state.orderForm[formElement].value
            }
        
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order )
            .then(response => {
            this.setState({loading: false})
            this.props.history.push('/')
        });  
        event.preventDefault();
        console.log(this.props.ingredients)
    }

    inputChangeHandler(event, inputIdentifier) {
        const formData = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...formData[inputIdentifier]
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation )
        updatedFormElement.touched = true;
        formData[inputIdentifier] = updatedFormElement

        let formIsValid = true;
        for (let inputIdentifier in formData){
            formIsValid = formData[inputIdentifier].valid && formIsValid
        }
        console.log(formIsValid)
        this.setState({orderForm: formData, formIsValid: formIsValid})
    }
    render () {
        const formElementArray = []
        for (let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config: this.state.orderForm[key]
            })
        }
        let form =
        <form onSubmit={this.orderHandler}>
            {formElementArray.map(formElement => (
                <Input 
                key={formElement.id}
                type={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}/>
            ))}
            <Button clicked={this.orderHandler} disabled={!this.state.formIsValid} buttonStyle={'Success'}>Order</Button>
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