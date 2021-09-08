import {useEffect} from "react";
import {useRecoilValue} from "recoil";

import styles from "../Archive/ArchiveContainer.module.scss";
import WorkItemsList from "../../components/WorkItemsList/WorkItemsList";
import workItemsArchiveState, {useWorkItemsArchive} from "../../atoms/workItems/workItemsArchive";
import ListHeader from "../../ui/ListHeader/ListHeader";

const ArchiveContainer = () => {
    const workItemsArchive = useRecoilValue(workItemsArchiveState);
    const { fetchAll } = useWorkItemsArchive();

    useEffect(() => {
        fetchAll()
    }, []);

    return (
        <div className={styles.wrapper}>
            <ListHeader title="Archive" counter={workItemsArchive.length} />
            <div className={styles.title}>Archive</div>
            <WorkItemsList items={workItemsArchive} containerClassName={styles['work-items-list']} />
        </div>
    )
};

export default ArchiveContainer;