import { Link } from 'react-router-dom'
import classNames from "classnames";

import styles from './WorkItem.module.scss'

const WorkItem = ({ id, name, resolved }) => {
    return <Link to={`/browse/${id}`} className={classNames(styles.wrapper, {
        [styles.resolved]: resolved
    })}>

            <div className={styles['work-item-name']}>{name}</div>
            <div className={styles['work-item-number']}>#{id}</div>

    </Link>
};

export default WorkItem;
