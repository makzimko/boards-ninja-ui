import { useRecoilCallback } from 'recoil';
import axios from 'axios';

import { ListsList } from './types';
import { listsListState } from './atoms';

const useListsActions = () => {
  const fetch = useRecoilCallback(
    ({ set }) =>
      async (projectId: string) => {
        const { data } = await axios.get<ListsList>(
          `/v1/projects/${projectId}/lists`
        );

        set(listsListState, data);
      },
    []
  );

  return { fetch };
};

export default useListsActions;
