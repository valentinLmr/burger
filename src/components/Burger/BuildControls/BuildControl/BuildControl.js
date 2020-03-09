import React from 'react';
import styles from './BuildControl.module.css'

const buildControl = (props) => (
    <div className={styles.BuildControl}>
        <button 
        className={styles.Less} 
        onClick={props.removed}
        disabled={props.disabled}>less</button>
        <div className={styles.Label}>{props.label}</div>
        <button className={styles.More} onClick={props.added}>more</button>
    </div>
)

export default buildControl;