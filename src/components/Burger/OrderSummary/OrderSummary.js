import React, { Component } from 'react';
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients).map(ingrendientKey => {
            return <li key={ingrendientKey}>
            <span style= {{textTransform: 'capitalize'}}>{ingrendientKey}</span> : {this.props.ingredients[ingrendientKey]} </li>
            })

        return (
                <Aux>
                    <h3>Your Order</h3>
                    <p> A delicious burger with the fololowing ingredients</p>
                    <ul>
                        {ingredientSummary}
                    </ul>
            <p> <strong>total price : {this.props.price.toFixed(2)}</strong></p>
                    <p>Continue to ChechOut ?</p>
                    <Button  clicked={this.props.purchasedCancel} buttonStyle='Danger'>Cancel</Button>
                    <Button  clicked={this.props.purchasedContinue} buttonStyle='Success'>Continue</Button>
                </Aux>
            )
    }
} 

export default OrderSummary