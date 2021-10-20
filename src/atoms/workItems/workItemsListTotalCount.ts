import { atom } from "recoil";

export type WorkItemsListTotalCount = number | null;

const workItemsListTotalCountState = atom<WorkItemsListTotalCount>({
    key: 'WorkItemsListTotalCount',
    default: null
});

export default  workItemsListTotalCountState;