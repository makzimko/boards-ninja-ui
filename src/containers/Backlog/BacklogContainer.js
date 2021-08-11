import {useCallback, useState} from "react";

import WorkItemsList from "../../components/WorkItemsList/WorkItemsList";
import InlineCreateItem from "../../components/InlineCreateItem/InlineCreateItem";

import styles from './BacklogContainer.module.scss'

const initialList = [{
    id: 1,
    name: 'First work item',
    resolved: true
}, {
    id: 2,
    name: 'Second work item',
    resolved: false
}]

const BacklogContainer = () => {
    const [list, setList] = useState(initialList);

    const onCreate = useCallback((name) => {
        const newItem = {
            id: list.length + 1,
            name,
            resolved: false
        };
        setList([...list, newItem])
    }, [setList, list])

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Backlog</div>
            <WorkItemsList items={list} containerClassName={styles['work-items-list']} />
            <InlineCreateItem onCreate={onCreate} containerClassName={styles['create-item']} />
        </div>
    )
};

export default BacklogContainer;