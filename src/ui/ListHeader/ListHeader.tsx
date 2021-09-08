import styles from './ListHeader.module.scss';

type ListHeaderProps = {
    title: string,
    counter: number
}

const ListHeader = ({ title, counter }: ListHeaderProps) => {
    return <div className={styles.wrapper}>
        <div className={styles.title}>{title}</div>
        {counter && <div className={styles.counter}>{counter} items</div>}
    </div>
};

export default ListHeader;