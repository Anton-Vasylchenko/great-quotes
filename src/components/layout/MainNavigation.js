import React from 'react'
import { NavLink, Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.png'

import styles from './MainNavigation.module.css';

function MainNavigation() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link to="/">
                    <div className={styles.logo}>
                        <img src={logoImg} alt="logo" />
                    </div>
                </Link>
            </div>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <NavLink
                            activeClassName={styles.active}
                            to="/quotes">All Quotes</NavLink>
                    </li>
                    <li>
                        <NavLink
                            activeClassName={styles.active}
                            to="/new-quote">Add a Quote</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation