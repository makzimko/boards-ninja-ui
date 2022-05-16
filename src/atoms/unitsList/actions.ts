import axios from 'axios';
import { useRecoilCallback } from 'recoil';
import { unitsListLoadingState, unitsListState } from './atoms';
import { LOADING } from '../loading';
import { UnitsList } from './types';

const useUnitsListActions = () => {
  const fetchAll = useRecoilCallback(
    ({ set }) =>
      async (projectKey: string) => {
        set(unitsListLoadingState, LOADING.PENDING);

        try {
          const { data } = await axios.get<UnitsList>(
            `/v1/projects/${projectKey}/units`
          );

          set(unitsListLoadingState, LOADING.SUCCESS);
          set(unitsListState, data);
        } catch (e) {
          set(unitsListLoadingState, LOADING.ERROR);
        }
      },
    []
  );

  return { fetchAll };
};

export default useUnitsListActions;
