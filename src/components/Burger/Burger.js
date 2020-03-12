import React from 'react';
import style from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import {withRouter} from 'react-router-dom';

const burger = (props) => {
    let ingredientsArray = Object.keys(props.ingredients).map(ingredientKey => {
        return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
           
           return  <BurgerIngredients key={ingredientKey + i} type={ingredientKey} />
        });
    }).reduce((prev, curr) => {
        let test = prev.concat(curr)
        return test
    }, []);
    if (ingredientsArray.length === 0) {
        ingredientsArray = <p>PLease start add ingredients</p>
    }

   

    return (
        <div className={style.Burger}>
            <BurgerIngredients type='bread-top'/>
            {ingredientsArray}
            <BurgerIngredients type='bread-bottom'/>
        </div>
    );
}
export default withRouter(burger);