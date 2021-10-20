import { atom } from 'recoil';

import {WorkItem} from "../../types/workItems";

export type WorkItemsListData = Array<WorkItem>;

const workItemsListDataState = atom<WorkItemsListData>({
    key: 'WorkItemsListData',
    default: []
});

export default workItemsListDataState;