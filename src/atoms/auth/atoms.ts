import { atom } from 'recoil';

import { loadingState } from '../loading';

export const authLoadingState = loadingState('AuthLoading');

export const userInfoState = atom({
  key: 'UserInfo',
  default: undefined,
});
