import { atomFamily, selectorFamily } from 'recoil';

import { Unit, UnitId } from './types';
import { ListId } from '../lists';

export const unitState = atomFamily<Unit, UnitId>({
  key: 'Unit',
  default: undefined,
});

export const listUnitIdsState = atomFamily<UnitId[], ListId>({
  key: 'ListUnitIds',
  default: [],
});

export const listUnitsState = selectorFamily<Unit[], ListId>({
  key: 'ListUnits',
  get:
    (listId) =>
    ({ get }) => {
      const listUnitIds = get(listUnitIdsState(listId));

      return listUnitIds.map((unitId) => get(unitState(unitId)));
    },
});
