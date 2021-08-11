import { Link } from 'react-router-dom'

import styles from './WorkItem.module.scss'

const WorkItem = ({ id, name, resolved }) => {
    return <Link to={`/browse/${id}`}>
        <div className={styles.wrapper}>
            <div className={styles['work-item-name']}>{name}</div>
            <div className={styles['work-item-number']}>#{id}</div>
        </div>
    </Link>
};

export default WorkItem;
