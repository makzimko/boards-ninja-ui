import { selector } from 'recoil';
import workItemsListDataState from "./workItemsListData";

export type WorkItemsListLoadedCount = number;

const workItemsListLoadedCountState = selector<WorkItemsListLoadedCount>({
    key: 'WorkItemsListLoadedCount',
    get: ({ get }) => get(workItemsListDataState).length
});

export default workItemsListLoadedCountState;