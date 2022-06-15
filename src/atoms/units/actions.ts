import { useRecoilCallback } from 'recoil';

import { ListId } from '../lists';
import axios from 'axios';
import { ApiUnit, Unit, UnitId } from './types';
import { listUnitIdsState, unitState } from './atoms';

const useUnitsActions = () => {
  const fetchByListId = useRecoilCallback(
    ({ set }) =>
      async (listId: ListId) => {
        const { data } = await axios.get<ApiUnit[]>(
          `/v1/lists/${listId}/units`
        );

        const unitIds = data.map<UnitId>(({ _id: id, ...rest }) => {
          set(unitState(id), (currVal) => ({
            ...currVal,
            ...rest,
            id,
          }));

          return id;
        });

        set(listUnitIdsState(listId), unitIds);
      },
    []
  );

  const createUnitInList = useRecoilCallback(
    ({ set }) =>
      async ({ name, listId }: Pick<Unit, 'name'> & { listId: ListId }) => {
        const { data } = await axios.post<ApiUnit>(
          `/v1/lists/${listId}/units`,
          {
            name,
          }
        );

        const { _id: id, ...rest } = data;

        set(unitState(id), (currVal) => ({
          ...currVal,
          ...rest,
          id,
        }));

        set(listUnitIdsState(listId), (currVal) => [...currVal, id]);
      },
    []
  );

  return { fetchByListId, createUnitInList };
};

export default useUnitsActions;
