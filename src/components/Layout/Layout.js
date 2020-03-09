import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import styles from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/Toolbar/SideDrawer/SideDrawer'

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClose = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerOpen = () => {
        this.setState({showSideDrawer: true})

    }


    render () {
        return (
            <Aux>
        
            <Toolbar clicked={this.sideDrawerOpen}/> 
            <SideDrawer
            closed={this.sideDrawerClose}
            show={this.state.showSideDrawer}
            />
        
        <main className={styles.content}>
            {this.props.children}
        </main>
    </Aux>
        )
    }
}
export default Layout;