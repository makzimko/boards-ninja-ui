import {useRecoilValue} from "recoil";

import useProjectDetailsActions from "./actions";
import {projectDetailsState} from "./atoms";
import {ProjectDetails} from "./types";

const useProjectDetails = (projectKey: string): ProjectDetails => {
    const value = useRecoilValue(projectDetailsState);
    const actions = useProjectDetailsActions(projectKey);
    return [value, actions];
}

export default useProjectDetails;