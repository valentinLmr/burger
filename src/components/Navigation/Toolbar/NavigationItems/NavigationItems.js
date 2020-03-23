import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './NavigationItems.module.css';


const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <li className={styles.NavigationItem}> <NavLink  to='/' exact activeClassName={styles.active} > BurgerBuilder </NavLink></li>
 {props.isAuthentificated 
    ? <li className={styles.NavigationItem}> <NavLink  to='/orders' activeClassName={styles.active} > Orders</NavLink></li> 
    : null 
 }
<li className={styles.NavigationItem}> 
    {!props.isAuthentificated 
        ? <NavLink  to='/auth' activeClassName={styles.active} > Authentification</NavLink> 
        : <NavLink  to='/logout' activeClassName={styles.active} > Logout</NavLink>
    }
</li>
    </ul>
);
export default navigationItems