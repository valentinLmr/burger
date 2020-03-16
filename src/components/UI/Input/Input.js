import React from 'react';
import styles from './Input.module.css'
const input = (props) => {

    let inputElement = '';
    const inputStyles = [styles.InputElement]

    if(props.invalid && props.shouldValidate && props.touched ) {
        inputStyles.push(styles.Invalid)
    }

    switch (props.elementType){
        case('input'): inputElement = <input  onChange={props.changed} className={inputStyles.join(' ')}{...props.elementConfig} value={props.value} />; break
        case('textarea'): inputElement = <textarea onChange={props.changed} className={styles.InputElement} {...props.elementConfig} value={props.value} /> ; break
        case('select'): inputElement = (
        <select
            className={styles.InputElement}
            value={props.value}
            onChange={props.changed}>
            {props.elementConfig.options.map(option => (
                <option value={option.value}>
                    {option.displayValue}
                </option> 
            ))}
        </select>); break
        default: inputElement = <input onChange={props.changed} className={styles.InputElement} {...props.elementConfig}  />
    }

    let validationError = null;
    if (props.invalid && props.touched) {
    validationError = <p><i>Please enter a valid {props.type}! </i></p>;
    }

    return (
    <div className={styles.Input}>
        <label className={styles.Label}>{props.lable}</label>
        {inputElement}{validationError}
    </div>
    )
}
export default input