import { useRecoilCallback } from 'recoil';
import axios, { AxiosError } from 'axios';
import {
  authLoadingState,
  loginErrorState,
  loginLoadingState,
  userInfoState,
} from './atoms';
import { LOADING } from '../loading/types';
import { UserInfo } from './types';
import { AxiosErrorResponse } from '../../types/axios';

const useAuthActions = () => {
  const fetchUserInfo = useRecoilCallback(({ set }) => async () => {
    set(authLoadingState, LOADING.PENDING);
    try {
      const { data } = await axios.get('/v1/auth');

      set(authLoadingState, LOADING.SUCCESS);
      set(userInfoState, data);
    } catch (e) {
      set(authLoadingState, LOADING.ERROR);
    }
  });

  const performLogin = useRecoilCallback(
    ({ set, reset }) =>
      async (login: string, password: string) => {
        set(loginLoadingState, LOADING.PENDING);
        reset(loginErrorState);

        try {
          const { data } = await axios.post<UserInfo>('/v1/auth/login', {
            login,
            password,
          });

          set(loginLoadingState, LOADING.SUCCESS);
          set(userInfoState, data);
        } catch (e) {
          const { response } = e as AxiosError<AxiosErrorResponse>;

          set(loginLoadingState, LOADING.ERROR);
          set(loginErrorState, response?.data.message ?? 'Uncaught error');
        }
      }
  );

  return { fetchUserInfo, performLogin };
};

export default useAuthActions;
