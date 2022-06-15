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

  const fetchById = useRecoilCallback(
    ({ set }) =>
      async (id: UnitId) => {
        const { data } = await axios.get<ApiUnit>(`/v1/units/${id}`);

        const { _id, ...rest } = data;

        set(unitState(id), (currVal) => ({
          ...currVal,
          ...rest,
          id: _id,
        }));
      },
    []
  );

  const updateById = useRecoilCallback(
    ({ set }) =>
      async (id: UnitId, props: Partial<Unit>) => {
        const { data } = await axios.patch<ApiUnit>(`/v1/units/${id}`, props);

        const { _id, ...rest } = data;

        set(unitState(_id), { id: _id, ...rest });
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

  const removeById = useRecoilCallback(
    ({ set, reset, snapshot }) =>
      async (id: UnitId) => {
        const listId = snapshot.getLoadable(unitState(id)).contents.list;

        await axios.delete(`/v1/units/${id}`);

        set(listUnitIdsState(listId), (currVal) =>
          currVal.filter((unitId) => unitId !== id)
        );
        reset(unitState(id));
      },
    []
  );

  const moveUnit = useRecoilCallback(
    ({ set, snapshot }) =>
      async (id: UnitId, listId: ListId) => {
        const currentListId = snapshot.getLoadable(unitState(id)).contents.list;
        await axios.post(`/v1/units/move`, {
          ids: [id],
          list: listId,
        });

        set(unitState(id), (currVal) => ({
          ...currVal,
          list: listId,
        }));

        set(listUnitIdsState(currentListId), (currVal) =>
          currVal.filter((unitId) => unitId !== id)
        );
        set(listUnitIdsState(listId), (currVal) => [...currVal, listId]);
      },
    []
  );

  return {
    fetchByListId,
    fetchById,
    updateById,
    createUnitInList,
    removeById,
    moveUnit,
  };
};

export default useUnitsActions;
