import {atom, selector} from "recoil";
import {UnitsListData} from "./types";
import loadingState from "../loading/loading";

export const UnitsListItemsState = atom<UnitsListData['items']>({
    key: 'UnitsListItems',
    default: []
});

export const UnitsListLoadingState = loadingState('UnitsList');

export const UnitsListTotalCountState = atom<UnitsListData['totalCount']>({
    key: 'UnitsListTotalCount',
    default: 0
});

export const UnitListCountState = selector<UnitsListData['count']>({
    key: 'UnitsListCount',
    get: (({ get }) => get(UnitsListItemsState).length)
});

export const UnitsListHasMoreState = selector<UnitsListData['hasMore']>({
    key: 'UnitListHasMore',
    get: ({ get }) => {
        const totalCount = get(UnitsListTotalCountState);
        const count = get(UnitListCountState);

        return totalCount === 0 || totalCount > count;
    }
});

const UnitsListDataState = selector<UnitsListData>({
    key: 'UnitsListData',
    get: (({ get }) => ({
        isLoading: get(UnitsListLoadingState),
        items: get(UnitsListItemsState),
        count: get(UnitListCountState),
        totalCount: get(UnitsListTotalCountState),
        hasMore: get(UnitsListHasMoreState)
    }))
});

export default UnitsListDataState;