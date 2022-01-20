import {useCallback, useEffect} from "react";
import {useRecoilValue} from "recoil";

import WorkItemsList from "../../components/WorkItemsList/WorkItemsList";
import InlineCreateItem from "../../components/InlineCreateItem/InlineCreateItem";
// import workItemsListState, {useWorkItemsList} from "../../atoms/workItems1/workItemsList";

import useWorkItemsList, { workItemsListDataState, workItemsListTotalCountState } from "../../atoms/workItems";

import styles from './BacklogContainer.module.scss'
import ListHeader from "../../ui/ListHeader/ListHeader";


const BacklogContainer = () => {
    const workItemsListData = useRecoilValue(workItemsListDataState);
    const workItemsListTotalCount = useRecoilValue(workItemsListTotalCountState);

    const { loadMore } = useWorkItemsList();

    useEffect(() => {
        loadMore();
    }, []);

    // const onCreate = useCallback((name) => {
    //     createWorkItem({
    //         name,
    //     });
    // }, [createWorkItem]);

    return (
        <div className={styles.wrapper}>
            <div className={styles['top-panel']}>
                <ListHeader title="Backlog" counter={workItemsListTotalCount} />
                {/*<InlineCreateItem onCreate={onCreate} containerClassName={styles['create-item']} />*/}
            </div>
            <WorkItemsList items={workItemsListData} containerClassName={styles['work-items-list']} />
        </div>
    )
};

export default BacklogContainer;