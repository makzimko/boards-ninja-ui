import styles from './WorkItem.module.scss'

const WorkItem = ({ id, name, resolved }) => {
    return <div className={styles.wrapper}>
        <div className={styles['work-item-name']}>{name}</div>
        <div className={styles['work-item-number']}>#{id}</div>
    </div>
};

export default WorkItem;
