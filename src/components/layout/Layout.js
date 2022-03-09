import styles from './Layout.module.css';
import MainNavigation from './MainNavigation';

function Layout({ children }) {
    return (
        <>
            <MainNavigation />

            <div className={styles.main}>
                {children}
            </div>
        </>
    )
}

export default Layout