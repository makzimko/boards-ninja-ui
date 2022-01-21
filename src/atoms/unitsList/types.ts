import {LOADING} from "../loading/loading";

export type UnitsListItem = {
    _id: string;
    name: string;
    completed: boolean
};

export type UnitsListData = {
    isLoading: LOADING;
    items: UnitsListItem[];
    count: number;
    totalCount: number;
    hasMore: boolean;
}

export type UnitsListActions = {
    loadMore: () => void
};

export type UnitsList = [UnitsListData, UnitsListActions];
