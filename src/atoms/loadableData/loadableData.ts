import {atom} from "recoil";
import {LOADING} from "../loading/loading";

type LoadableData<T> = {
    state: LOADING.INITIAL
}| {
    state: LOADING.PENDING,
    data?: T
} |{
    state: LOADING.SUCCESS,
    data: T
} | {
    state: LOADING.ERROR,
    error: {
        code: number,
        message: string
    }
}

const createLoadableData = <T>(key: string) => atom<LoadableData<T>>({
    key,
    default: {
        state: LOADING.INITIAL,
    }
});

export default createLoadableData;