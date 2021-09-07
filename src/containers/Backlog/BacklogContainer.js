import {useCallback, useEffect} from "react";
import {useRecoilValue} from "recoil";

import WorkItemsList from "../../components/WorkItemsList/WorkItemsList";
import InlineCreateItem from "../../components/InlineCreateItem/InlineCreateItem";
import workItemsListState, {useWorkItemsList} from "../../atoms/workItems/workItemsList";

import styles from './BacklogContainer.module.scss'


const BacklogContainer = () => {
    const workItemsList = useRecoilValue(workItemsListState);
    const { fetchAll, createWorkItem } = useWorkItemsList();

    useEffect(() => {
        fetchAll();
    }, []);

    const onCreate = useCallback((name) => {
        createWorkItem({
            name,
        });
    }, [createWorkItem]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Backlog</div>
            <WorkItemsList items={workItemsList} containerClassName={styles['work-items-list']} />
            <InlineCreateItem onCreate={onCreate} containerClassName={styles['create-item']} />
        </div>
    )
};

export default BacklogContainer;