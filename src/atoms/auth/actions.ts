import { useRecoilCallback } from 'recoil';
import axios from 'axios';
import { authLoadingState, userInfoState } from './atoms';
import { LOADING } from '../loading/types';

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

  return { fetchUserInfo };
};

export default useAuthActions;
