import {useRecoilValue} from "recoil";

import useWorkItemsList, {
    workItemsListDataState,
    workItemsListLoadingState,
    workItemsListTotalCountState,
    workItemsListLoadedCountState,
    workItemsListHasMoreState
} from "../../atoms/workItems";

const Test = () => {
    const {loadMore, reset} = useWorkItemsList();

    const data = useRecoilValue(workItemsListDataState);
    const loading = useRecoilValue(workItemsListLoadingState);
    const totalCount = useRecoilValue(workItemsListTotalCountState);
    const loadedCount = useRecoilValue(workItemsListLoadedCountState);
    const hasMore = useRecoilValue(workItemsListHasMoreState)


    return <div>
        <h1>Loading: {loading}</h1>
        <h2>total count: {JSON.stringify(totalCount)}</h2>
        <h2>current loaded: {loadedCount}</h2>
        <ul>
            {data.map(({id, name}) =>
                <li key={id}>{name}</li>
            )}
        </ul>
        { hasMore && <button onClick={loadMore}>load more</button>}
        <button onClick={reset}>reset</button>
    </div>
};

export default Test;