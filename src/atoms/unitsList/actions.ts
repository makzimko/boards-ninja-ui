import axios from 'axios';
import { useRecoilCallback } from 'recoil';
import { unitsListLoadingState, unitsListState } from './atoms';
import { LOADING } from '../loading';
import { Unit, UnitsList } from './types';

const useUnitsListActions = () => {
  const fetchAll = useRecoilCallback(
    ({ set }) =>
      async (projectKey: string) => {
        set(unitsListLoadingState, LOADING.PENDING);

        try {
          const { data } = await axios.get<UnitsList>(
            `/v1/projects/${projectKey}/units`,
            {
              params: {
                limit: 9999,
              },
            }
          );

          set(unitsListLoadingState, LOADING.SUCCESS);
          set(unitsListState, data);
        } catch (e) {
          set(unitsListLoadingState, LOADING.ERROR);
        }
      },
    []
  );

  const createSimpleUnit = useRecoilCallback(
    ({ set }) =>
      async ({
        name,
        projectKey,
      }: Pick<Unit, 'name'> & { projectKey: string }) => {
        const { data } = await axios.post<Unit>(
          `/v1/projects/${projectKey}/units`,
          {
            name,
          }
        );

        set(unitsListState, (prevValue) => [...prevValue, data]);
      }
  );

  return { fetchAll, createSimpleUnit };
};

export default useUnitsListActions;
