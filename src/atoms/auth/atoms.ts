import { atom } from 'recoil';

import { loadingState } from '../loading';
import { UserInfo } from './types';

export const authLoadingState = loadingState('AuthLoading');

export const userInfoState = atom<UserInfo>({
  key: 'UserInfo',
  default: undefined,
});

export const loginLoadingState = loadingState('LoadingState');

export const loginErrorState = atom<string>({
  key: 'LoginError',
  default: undefined,
});
