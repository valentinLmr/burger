import React from 'react';
import styles from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from './NavigationItems/NavigationItems'
const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <div className={styles.DrawerToggle} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className={styles.Logo}>
            <Logo/>
        </div>
        <nav className={styles.DesktopOnly}>
           <NavigationItems isAuthentificated={props.isAuth}/>
        </nav>
    </header>
)

export default toolbar;