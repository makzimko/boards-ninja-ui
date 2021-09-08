import { Link } from "react-router-dom";

import styles from './SummaryWidget.module.scss';

const SummaryWidget = () => {
    return <div className={styles.wrapper}>
        <div className={styles.content}>
            <Link to="/backlog" className={styles.link}>Backlog</Link>
            <Link to="/archive" className={styles.link}>Archive</Link>
        </div>
        <div className={styles.bottom}>
            <div className={styles['logout-button']} onClick={Function.prototype}>Logout</div>
        </div>
    </div>
};

export default SummaryWidget;