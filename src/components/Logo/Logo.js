import React from 'react';
import burgerLogo from '../../assets/images/original.png'
import styles from './Logo.module.css'
const logo = () => (
    <div className={styles.Logo}>
        <img src={burgerLogo} alt='Myburger'/>
    </div>
);

export default logo;