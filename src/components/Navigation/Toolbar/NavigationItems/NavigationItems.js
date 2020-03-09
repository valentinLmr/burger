import React from 'react';
import styles from './NavigationItems.module.css';


const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <li className={styles.NavigationItem}> <a className={styles.active} href='/'>BurgerBuilder</a></li>
        <li className={styles.NavigationItem}> <a  href='/'>CheckOut</a></li>

    </ul>
);
export default navigationItems