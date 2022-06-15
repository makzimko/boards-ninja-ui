import { useRecoilCallback } from 'recoil';
import axios from 'axios';

import { ApiList, ListId } from './types';
import { listState, listIdsState } from './atoms';

const useListsActions = () => {
  const fetch = useRecoilCallback(
    ({ set }) =>
      async (projectKey: string) => {
        const { data } = await axios.get<ApiList[]>(
          `/v1/projects/${projectKey}/lists`
        );

        const listIds = data.map<ListId>(({ _id, ...rest }) => {
          set(listState(_id), (currVal) => ({
            ...currVal,
            id: _id,
            ...rest,
          }));

          return _id;
        });

        set(listIdsState, listIds);
      },
    []
  );

  const createListInProject = useRecoilCallback(
    ({ set }) =>
      async (name: string, projectKey: string) => {
        const { data } = await axios.post<ApiList>(
          `/v1/projects/${projectKey}/lists`,
          {
            name,
          }
        );

        const { _id: id, ...rest } = data;

        set(listState(id), { id, ...rest });

        set(listIdsState, (prevValue) => [
          ...prevValue.slice(0, -1),
          id,
          ...prevValue.slice(-1),
        ]);
      },
    []
  );

  return { fetch, createListInProject };
};

export default useListsActions;
