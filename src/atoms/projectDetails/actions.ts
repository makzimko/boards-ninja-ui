import {useRecoilCallback} from "recoil";
import axios from "axios";

import {projectDetailsLoadingState, projectDetailsState} from "./atoms";
import {LOADING} from "../loading/loading";
import {ProjectDetails} from "./types";

const useProjectDetailsActions = () => {
    const getProjectInfo = useRecoilCallback(({ set }) => async (projectKey: string) => {
        set(projectDetailsLoadingState, LOADING.PENDING);

        try {
            const { data } = await axios.get<ProjectDetails>(`/v1/projects/${projectKey}`);

            set(projectDetailsLoadingState, LOADING.SUCCESS);
            set(projectDetailsState, data);
        } catch (e) {
            set(projectDetailsLoadingState, LOADING.ERROR);
        }
    });

    return {
        getProjectInfo
    }
};

export default useProjectDetailsActions;