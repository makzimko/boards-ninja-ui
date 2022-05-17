import { atomFamily } from 'recoil';

import { LOADING } from './types';

export const loadingState = atomFamily<LOADING, string>({
  key: 'Loading',
  default: LOADING.INITIAL,
});
