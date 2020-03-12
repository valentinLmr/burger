import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import style from './CheckoutSummary.module.css';

const checkoutSummary = props => {
    return (
        <div className={style.CheckoutSummary}>
            <h1>Enjoy It</h1>
            <div style={{width: '100%', margin:'auto'}}>
              <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
        buttonStyle='Danger' 
        clicked={props.checkoutCancelled} >Cancel</Button>
        <Button 
        buttonStyle='Success'
        clicked={props.checkoutContinued} >Continue </Button>
        </div>
    )
}

export default checkoutSummary;