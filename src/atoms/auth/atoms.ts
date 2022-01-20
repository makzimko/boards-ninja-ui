import { atom } from 'recoil';

import loadingState from "../loading/loading";
import { UserInfo } from './types';

export const userInfoState = atom<UserInfo | undefined>({
    key: 'UserInfo',
    default: undefined
});

export const authLoadingState = loadingState("AuthLoading");

export const loginLoadingState = loadingState("LoginLoading");

export const loginErrorState = atom<string | undefined>({
    key: 'LoginError',
    default: undefined
});