import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './NavigationItems.module.css';


const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <li className={styles.NavigationItem}> <NavLink  to='/' exact activeClassName={styles.active} > BurgerBuilder </NavLink></li>
        <li className={styles.NavigationItem}> <NavLink  to='/orders' activeClassName={styles.active} > Orders</NavLink></li>
    </ul>
);
export default navigationItems