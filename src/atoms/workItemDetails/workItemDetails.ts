import {useMemo} from "react";
import {atomFamily, useRecoilCallback} from "recoil";
import axios from "axios";

import {WorkItem} from "../../types/workItems";

const workItemDetailsState = atomFamily<WorkItem | undefined, string>({
    key: 'WorkItemDetails',
    default: undefined
});

export const useWorkItemDetails = (id) => {
    const fetchWorkItem = useRecoilCallback(({ set }) => () => {
        axios.get(`/v1/work-items/${id}`)
            .then(({ data }) => {
                set(workItemDetailsState(id), data)
            });
    }, [id]);

    const updateWorkItem = useRecoilCallback(({ set }) => (params) => {
        axios.patch(`/v1/work-items/${id}`, params)
            .then(({ data }) => {
                set(workItemDetailsState(id), data)
            });
    }, [id])

    return useMemo(() => ({ fetchWorkItem, updateWorkItem }), [fetchWorkItem, updateWorkItem])
}

export default workItemDetailsState;