import { useMemo } from "react";
import { useRecoilCallback } from "recoil";
import axios from "axios";

import {LOADING} from "../loading/loading";
import workItemsListDataState from "./workItemsListData";
import workItemsLoadingState from "./workItemsLoading";
import workItemsListTotalCountState from "./workItemsListTotalCount";
import workItemsListLoadedCountState from "./workItemsListLoadedCount";
import workItemsListHasMore from "./workItemsListHasMore";
import workItemsListTotalCount from "./workItemsListTotalCount";

type WorkItemsListMethods = {
    loadMore: () => Promise<void>
    reset: () => void
}

export const useWorkItemsList = (): WorkItemsListMethods => {
    const loadMore = useRecoilCallback(({ set, snapshot }) => async () => {
        const hasMore = snapshot.getLoadable(workItemsListHasMore).getValue();

        if (!hasMore) {
            return;
        }

        set(workItemsLoadingState, LOADING.PENDING);
        try {
            const offset = snapshot.getLoadable(workItemsListLoadedCountState).getValue();
            const { data, headers } = await axios.get('/v1/work-items', {
                params: {
                    offset
                }
            });
            set(workItemsLoadingState, LOADING.SUCCESS);
            set(workItemsListDataState, (prevData) => [...prevData, ...data]);
            set(workItemsListTotalCountState, +headers['x-total-count']);
        } catch (e) {
            set(workItemsLoadingState, LOADING.ERROR);
        }
    });

    const reset = useRecoilCallback(({ set }) => () => {
        set(workItemsListDataState, []);
        set(workItemsListTotalCount, null);
        set(workItemsLoadingState, LOADING.INITIAL)
    });

    return useMemo<WorkItemsListMethods>(() => ({ loadMore, reset }), [loadMore])
};

export default useWorkItemsList;