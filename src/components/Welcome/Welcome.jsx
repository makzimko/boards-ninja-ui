import { Link } from "react-router-dom";

import styles from './Welcome.module.scss'

const Welcome = () => {
    return <div className={styles.wrapper}>
        <div className={styles['greeting-1']}>Welcome to Boards Ninja</div>
        <div className={styles['greeting-2']}>The place where lists doing magic</div>
        <div>Please login</div>
        <div className={styles['login-wrapper']}>
            <Link to="/login"><span className={styles['login-button']}>Login</span></Link>
        </div>
        <div>or <a href="mailto:uakorn@gmail.com" className={styles['contact-me']}>contact me</a></div>
    </div>
};

export default Welcome;