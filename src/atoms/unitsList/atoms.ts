import { atomFamily } from 'recoil';

import { UnitsList } from './types';
import { loadingState } from '../loading';

export const unitsListState = atomFamily<UnitsList, string>({
  key: 'UnitsList',
  default: [],
});

export const unitsListLoadingState = loadingState('UnitsListLoading');
