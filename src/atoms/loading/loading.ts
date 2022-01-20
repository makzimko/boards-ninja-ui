import { atomFamily } from "recoil";

export enum LOADING {
    INITIAL = 0,
    PENDING = 1,
    SUCCESS = 2,
    ERROR = 3
}

export type Loading = LOADING;

const loadingState = atomFamily<Loading, string>({
    key: 'Loading',
    default: LOADING.INITIAL
});

export default loadingState;