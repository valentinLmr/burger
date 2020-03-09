import React, { Component } from 'react'
import Aux from '../../hoc/Aux' ;
import Burger from '../../components/Burger/Burger'
import BurgerController from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'


const INGREDIENTPRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {
   

    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1,
        },
        totalPrice: 4,
        Purchasing: false,
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCounted = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updateCounted;
        const priceAddition = INGREDIENTPRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice= oldPrice + priceAddition;
        this.setState({
            ingredients: updateIngredients,
            totalPrice: newPrice
        })
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount > 0) {
            const updatedCounted = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            }
            updatedIngredients[type] = updatedCounted;
            const priceDeduction = INGREDIENTPRICE[type];
            const oldPrice = this.state.totalPrice;
            const newPrice= oldPrice - priceDeduction;
            this.setState({
             ingredients: updatedIngredients,
                totalPrice: newPrice
            })
        }else{
            alert('No ingredients, add first')
        }
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelhandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinuehandler = () => {
        alert('You continue !');
    }

    render  ()   {
        const disableInfo ={
            ...this.state.ingredients
        }
        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        return(
            <Aux>
                <Modal 
                show={this.state.purchasing}
                modalClosed={this.purchaseCancelhandler}> 
                    <OrderSummary 
                    price={this.state.totalPrice}
                    purchasedCancel={this.purchaseCancelhandler}
                    purchasedContinue={this.purchaseContinuehandler} 
                    ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BurgerController
                ingredientAdded={this.addIngredientHandler} 
                ingredientRemove={this.removeIngredientHandler}
                disableInfo={disableInfo}
                price={this.state.totalPrice}
                purchasing={this.purchaseHandler}/>  
            </Aux>
        );
    }
}
export default BurgerBuilder;