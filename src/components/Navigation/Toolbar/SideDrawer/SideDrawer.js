import React from 'react';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import styles from './SideDrawer.module.css'
import Backdrop from '../../../UI/BackDrop/Backdrop';
import Aux from '../../../../hoc/Aux'

const sideDrawer = (props) => {

    let attachedClasses = [styles.SideDrawer, styles.Close];

    if (props.show) {
        attachedClasses = [styles.SideDrawer, styles.Open]
    }
    return (

        <Aux>
            <Backdrop show={props.show} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={styles.Logo}><Logo/></div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer