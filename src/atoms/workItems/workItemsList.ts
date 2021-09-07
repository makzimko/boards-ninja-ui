import {useCallback, useMemo} from "react";
import {atom, useRecoilCallback} from "recoil";

import { WorkItem } from "../../types/workItems";
import axios from "axios";

const workItemsListState = atom<WorkItem[]>({
    key: 'WorkItemsList',
    default: []
});

export const useWorkItemsList = () => {
  const fetchAll = useRecoilCallback(({ set }) => () => {
      axios.get('/v1/work-items')
          .then(({ data }) => {
              set(workItemsListState, () => data)
          })
  }, []);

  const createWorkItem = useCallback((params: Partial<WorkItem>) => {
      axios.post('/v1/work-items', params)
          .then(() => {
              fetchAll()
          })
  }, [fetchAll]);

  return useMemo(() => ({ fetchAll, createWorkItem }), [fetchAll, createWorkItem]);
};

export default workItemsListState;