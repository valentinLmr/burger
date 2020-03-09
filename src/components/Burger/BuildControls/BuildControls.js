import React from 'react';
import styles from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
]
const buildControls = (props) => (
    <div className={styles.BuildControls}>
        <p> Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(el => (
            <BuildControl 
                key={el.label}
                label={el.label} 
                added={() => props.ingredientAdded(el.type)}
                removed={()=> props.ingredientRemove(el.type)}
                disabled={props.disableInfo[el.type]}
                
            />
        ))}
        <button onClick={props.purchasing} className={styles.OrderButton}>Order Now</button>
    </div>
)

export default buildControls;