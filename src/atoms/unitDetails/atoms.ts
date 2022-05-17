import { atom } from 'recoil';
import { UnitDetails } from './types';

export const unitDetailsState = atom<UnitDetails>({
  key: 'UnitDetails',
  default: undefined,
});
