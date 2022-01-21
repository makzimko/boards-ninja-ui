import {useRecoilValue} from "recoil";

import {UnitsList} from "./types";
import UnitsListDataState from "./atoms";
import useUnitsListActions from "./actions";

const useUnitsList = (projectKey: string): UnitsList => {
    const value = useRecoilValue(UnitsListDataState);
    const actions = useUnitsListActions(projectKey);
    return [value, actions];
}

export default useUnitsList;