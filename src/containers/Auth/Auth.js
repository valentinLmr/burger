import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import style from './Auth.module.css'
class Auth extends Component {
    state= {
        form:{
            email:{
            elementType:'input',
            elementConfig:{
                type: 'email',
                placeholder:'your email'
            },
            value: '',
            validation:{
                required:true,
                isEmail: true
            },
            valid:false,
            touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type: 'password',
                    placeholder:'Password'
                },
                value: '',
                validation:{
                    required:true,
                    minLength: 6
                },
                valid:false,
                touched:false
                }
        }
    }

    inputChangeHandler = (event, controlName) => {
        const formData = {
            ...this.state.form,
            [controlName] :{
                ...this.state.form[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.form[controlName].validation),
                touched: true
            }
        };
        this.setState({form: formData})  
    }

    checkValidity = (value, rules) => {
        
        let isValid = true
        if (!rules) {
            return true;
        }

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length === rules.minLength
        }
        return isValid
    }

    
    render () {
        
        const formElementArray = []
        for (let key in this.state.form){
            formElementArray.push({
                id:key,
                config: this.state.form[key]
            })
        }

        const form = formElementArray.map(formElement => {
            return (
            <Input 
                key={formElement.id}
                type={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}/>
            )
        })
        return (
            <div className={style.AuthForm}>
                <form>
                    {form}
                <Button buttonStyle={'Success'}>Submit</Button>
                </form>
            </div>
        )
    }
}

export default Auth ;