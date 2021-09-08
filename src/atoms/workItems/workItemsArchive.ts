import {useMemo} from "react";
import {atom, useRecoilCallback} from "recoil";
import axios from "axios";

import {WorkItem} from "../../types/workItems";

const workItemsArchiveState = atom<WorkItem[]>({
    key: 'WorkItemsArchive',
    default: []
});

export const useWorkItemsArchive = () => {
    const fetchAll = useRecoilCallback(({ set }) => () => {
        axios.get('/v1/work-items/archive')
            .then(({ data }) => {
                set(workItemsArchiveState, () => data)
            })
    }, []);

    return useMemo(() => ({ fetchAll }), [fetchAll]);
}

export default workItemsArchiveState;