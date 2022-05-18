import { useRecoilCallback } from 'recoil';
import axios from 'axios';

import { List, ListsList } from './types';
import { listsListState } from './atoms';

const useListsActions = () => {
  const fetch = useRecoilCallback(
    ({ set }) =>
      async (projectKey: string) => {
        const { data } = await axios.get<ListsList>(
          `/v1/projects/${projectKey}/lists`
        );

        set(listsListState, data);
      },
    []
  );

  const createListInProject = useRecoilCallback(
    ({ set }) =>
      async (name: string, projectKey: string) => {
        const { data } = await axios.post<List>(
          `/v1/projects/${projectKey}/lists`,
          {
            name,
          }
        );

        set(listsListState, (prevValue) => [
          ...prevValue.slice(0, -1),
          data,
          ...prevValue.slice(-1),
        ]);
      },
    []
  );

  return { fetch, createListInProject };
};

export default useListsActions;
