import React from 'react';
import style from './Order.module.css'

const order = (props) => {

    let ingredients = [];
    for(let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientOutput = ingredients.map(ing => {
        return <span 
                    style={{
                        textTransforma:'capitalize',
                        display:'inline-block',
                        margin: '0 8px',
                        border: '1px solid #ccc',
                        padding: '5px'
                    }}
                    key={ing.name}>
                    {ing.name}: {ing.amount}
                </span>
    })

    return(
    <div className={style.Order}>
        <p>Ingredients: {ingredientOutput}</p>
        <p> Price: <strong>{Number.parseFloat(props.price).toFixed(2)}€</strong></p>
    </div>
    )
}

export default order