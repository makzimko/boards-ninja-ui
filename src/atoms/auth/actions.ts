import {useRecoilCallback} from "recoil";
import axios from "axios";

import {LOADING} from "../loading/loading";
import {authLoadingState, loginErrorState, loginLoadingState, userInfoState} from "./atoms";
import {UserInfo} from "./types";

const useAuthActions = () => {
    const getUserInfo = useRecoilCallback(({set}) => async () => {
        set(authLoadingState, LOADING.PENDING);
        set(userInfoState, undefined);

        try {
            const {data} = await axios.get<UserInfo>('/v1/auth');

            set(authLoadingState, LOADING.SUCCESS);
            set(userInfoState, data);
        } catch (e) {
            set(authLoadingState, LOADING.ERROR);
        }
    });

    const login = useRecoilCallback(({set}) => async (login: string, password: string) => {
        set(loginLoadingState, LOADING.PENDING);
        set(loginErrorState, undefined)

        try {
            const { data } = await axios.post<UserInfo>('/v1/auth/login', { login, password });

            set(loginLoadingState, LOADING.SUCCESS);
            set(authLoadingState, LOADING.SUCCESS);
            set(userInfoState, data);
        } catch (e) {
            set(loginLoadingState, LOADING.ERROR);
            set(loginErrorState, e.message);
        }
    })


    return {
        getUserInfo,
        login
    };
};

export default useAuthActions;