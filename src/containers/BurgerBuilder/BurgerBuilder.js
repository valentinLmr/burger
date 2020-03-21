import React, { Component } from 'react';
import { connect } from  "react-redux"
import Aux from '../../hoc/Aux' ;
import Burger from '../../components/Burger/Burger'
import BurgerController from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spiner from '../../components/UI/Spiner/Spiner';
import * as burgerBuilderActions from '../../store/action/index'



class BurgerBuilder extends Component {
   

    state = {
        Purchasing: false,
    }

    componentDidMount(){
        this.props.onInitIng()
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingName) => dispatch(burgerBuilderActions.addIngredrient(ingName)),
        onIngredientRemove: (ingName) => dispatch(burgerBuilderActions.removeIngredrient(ingName)),
        onInitIng: () => dispatch(burgerBuilderActions.initIng())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);