import { selector } from "recoil";
import workItemsListTotalCountState from "./workItemsListTotalCount";
import workItemsListLoadedCountState from "./workItemsListLoadedCount";

export type WorkItemsListHasMore = boolean;

const workItemsListHasMoreState = selector<WorkItemsListHasMore>({
    key: 'WorkItemsListHasMore',
    get: ({ get }) => {
        const totalCount = get(workItemsListTotalCountState);
        const loadedCount = get(workItemsListLoadedCountState);

        return totalCount === null ||  totalCount > loadedCount;
    }
});

export default workItemsListHasMoreState;