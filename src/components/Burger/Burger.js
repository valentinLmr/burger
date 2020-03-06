import React from 'react';
import style from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
const burger = (props) => {
    return (
        <div className={style.Burger}>
            <BurgerIngredients type='bread-top'/>
            <BurgerIngredients type='cheese'/>
            <BurgerIngredients type='meat'/>
            <BurgerIngredients type='salad'/>
            <BurgerIngredients type='bread-bottom'/>
        </div>
    );
}
export default burger;