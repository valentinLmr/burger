import React, { Component } from 'react'
import Aux from '../../hoc/Aux' ;
import Burger from '../../components/Burger/Burger'
import BurgerController from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spiner from '../../components/UI/Spiner/Spiner'


const INGREDIENTPRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {
   

    state = {
        ingredients: null,
        totalPrice: 4,
        Purchasing: false,
        loading: false
    }

    componentDidMount(){
        axios.get('/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data})
        });
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
        

        const queryParams= [];
            for (let i in this.state.ingredients){
                queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
            }
            queryParams.push('price=' + this.state.totalPrice)
            const queryString = queryParams.join('&')

            console.log(queryParams)
            console.log(queryString)

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render  ()   {
        const disableInfo ={
            ...this.state.ingredients
        }
        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let burger = <Spiner/> ;
        let orderSummary = null;        

        if(this.state.ingredients) {
        burger = (
        <Aux>
            <Burger ingredients={this.state.ingredients} />
            <BurgerController
                ingredientAdded={this.addIngredientHandler} 
                ingredientRemove={this.removeIngredientHandler}
                disableInfo={disableInfo}
                price={this.state.totalPrice}
                purchasing={this.purchaseHandler}/>
         </Aux>
        )
        orderSummary = <OrderSummary 
            price={this.state.totalPrice}
            purchasedCancel={this.purchaseCancelhandler}
            purchasedContinue={this.purchaseContinuehandler} 
            ingredients={this.state.ingredients}/>
    }
    if(this.state.loading) {
        orderSummary = <Spiner/>
    }
        return(
            <Aux>
                <Modal 
                show={this.state.purchasing}
                modalClosed={this.purchaseCancelhandler}> 
                    {orderSummary}
                </Modal>  
                {burger}
            </Aux>
        );
    }
}
export default BurgerBuilder;