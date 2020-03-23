import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/BurgerBuilder/CheckOut/CheckOut'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Orders from './containers/BurgerBuilder/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux';
import * as actions from './store/action/index';


class App extends Component {
  componentDidMount() {
    this.props.onTryToAutoSignIn()
  }
  render(){
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to='/' />
      </Switch>
      )

      if (this.props.isAuthentificated) {
        routes = (
          <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to='/' />
          </Switch>
        )
      }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }

}
const mapStateToProps = state => {
  return{
    isAuthentificated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryToAutoSignIn: () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
