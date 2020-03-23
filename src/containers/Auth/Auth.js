import React, { Component } from 'react';
import {connect} from 'react-redux';
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import style from './Auth.module.css'
import * as action from '../../store/action/index'
import Spinner from '../../components/UI/Spiner/Spiner'
import { Redirect} from 'react-router-dom'
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
        },
        isSignup: true
    }

    componentDidMount(){
        if(!this.props.building && this.props.path !== '/') {
            console.log(this.props.building, this.props.path)
            this.onSetAuthRedirect()
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
            isValid = value.length >= rules.minLength
        }
        return isValid
    }

    onSubmitAuth = event => {
        event.preventDefault();
        this.props.onAuth(this.state.form.email.value, this.state.form.password.value, this.state.isSignup)
    }

    switchAuthHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup}
        })
    }

    
    render () {
        
        const formElementArray = []
        for (let key in this.state.form){
            formElementArray.push({
                id:key,
                config: this.state.form[key]
            })
        }

        let form = formElementArray.map(formElement => {
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

        if(this.props.loading){
            form = <Spinner/>
        }

        let errorMessage = null;

        if(this.props.error) {
            errorMessage = (
            <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null
        if (this.props.isAuthentificated) {
            console.log(this.props.path)
            authRedirect = <Redirect to={this.props.path} />
        }

        return (
            <div className={style.AuthForm}>
                {authRedirect}
                {errorMessage}
                <form onSubmit= {this.onSubmitAuth}>
                    {form}
                <Button buttonStyle='Success'>Submit</Button>
                </form>
        <Button clicked={this.switchAuthHandler} buttonStyle="Danger">Switch to {this.state.isSignup ? 'SIGNUP' : 'SIGNIN'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
     return {
        token: state.auth.token,
        userId: state.auth.userId,
        error: state.auth.error,
        loading: state.auth.loading,
        isAuthentificated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        path: state.auth.authRedirectPath

     }
 }

 const mapDispatchToProps = dispatch => {
     return {
         onAuth: (email, password, isSignUp) => dispatch(action.auth(email, password, isSignUp)),
         onSetAuthRedirect: () => dispatch(action.redirect('/'))
     }
 }


export default connect(mapStateToProps, mapDispatchToProps)(Auth) ;