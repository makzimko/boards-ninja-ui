import {useRecoilCallback} from "recoil";
import axios from "axios";

import {UnitsListActions, UnitsListData} from "./types";
import {
    UnitListCountState,
    UnitsListHasMoreState,
    UnitsListItemsState,
    UnitsListLoadingState,
    UnitsListTotalCountState
} from "./atoms";
import {LOADING} from "../loading/loading";

const useUnitsListActions = (projectKey: string): UnitsListActions => {
    const loadMore = useRecoilCallback(({ set, snapshot }) => async () => {
        const hasMore = snapshot.getLoadable(UnitsListHasMoreState).getValue();
        if (!hasMore) {
            return;
        }

        set(UnitsListLoadingState, LOADING.PENDING);

        try {
            const { data, headers } = await axios.get<UnitsListData['items']>(`/v1/projects/${projectKey}/units`, {
                params: {
                    offset: snapshot.getLoadable(UnitListCountState).getValue()
                }
            });

            set(UnitsListLoadingState, LOADING.SUCCESS)
            set(UnitsListItemsState, (prevDate) => [...prevDate, ...data]);
            set(UnitsListTotalCountState, +headers['x-total-count']);
        } catch (e) {
            set(UnitsListLoadingState, LOADING.ERROR);
        }
    });

    return {
        loadMore
    }
};

export default useUnitsListActions;