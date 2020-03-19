import React, { Component } from 'react';
import { connect } from  "react-redux"
import Aux from '../../hoc/Aux' ;
import Burger from '../../components/Burger/Burger'
import BurgerController from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
// import axios from '../../axios-order'
import Spiner from '../../components/UI/Spiner/Spiner';
import * as actionTypes  from '../../store/action'



class BurgerBuilder extends Component {
   

    state = {
        Purchasing: false,
        loading: false
    }

    componentDidMount(){
        // axios.get('/ingredients.json')
        // .then(response => {
        //     this.setState({ingredients: response.data})
        // });
    }

    

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelhandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinuehandler = () => {
        this.props.history.push('/checkout')
        
    }

    render  ()   {
        const disableInfo ={
            ...this.props.ings
        }
        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let burger = <Spiner/> ;
        let orderSummary = null;        

        if(this.props.ings) {
        burger = (
        <Aux>
            <Burger ingredients={this.props.ings} />
            <BurgerController
                ingredientAdded={this.props.onIngredientAdd} 
                ingredientRemove={this.props.onIngredientRemove}
                disableInfo={disableInfo}
                price={this.props.price}
                purchasing={this.purchaseHandler}/>
         </Aux>
        )
        orderSummary = <OrderSummary 
            price={this.props.price}
            purchasedCancel={this.purchaseCancelhandler}
            purchasedContinue={this.purchaseContinuehandler} 
            ingredients={this.props.ings}/>
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemove: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);