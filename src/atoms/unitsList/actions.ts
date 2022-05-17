import axios from 'axios';
import { useRecoilCallback } from 'recoil';
import { unitsListLoadingState, unitsListState } from './atoms';
import { LOADING } from '../loading';
import { UnitsList } from './types';
import { Unit } from '../../types/unit';

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
          set(unitsListState('default'), data);
        } catch (e) {
          set(unitsListLoadingState, LOADING.ERROR);
        }
      },
    []
  );

  const fetchByList = useRecoilCallback(
    ({ set }) =>
      async (listId: string) => {
        const { data } = await axios.get<UnitsList>(
          `/v1/lists/${listId}/units`
        );
        set(unitsListState(listId), data);
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

        set(unitsListState('default'), (prevValue) => [...prevValue, data]);
      }
  );

  const addUnitToList = useRecoilCallback(
    ({ set }) =>
      async ({ name, listId }: Pick<Unit, 'name'> & { listId: string }) => {
        const { data } = await axios.post<Unit>(`/v1/lists/${listId}/units`, {
          name,
        });

        set(unitsListState(listId), (prevValue) => [...prevValue, data]);
      }
  );

  return { fetchAll, fetchByList, createSimpleUnit, addUnitToList };
};

export default useUnitsListActions;
