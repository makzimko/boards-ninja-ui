import { atom } from 'recoil';

import { UnitsList } from './types';
import { loadingState } from '../loading';

export const unitsListState = atom<UnitsList>({
  key: 'UnitsList',
  default: [],
});

export const unitsListLoadingState = loadingState('UnitsListLoading');
