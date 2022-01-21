import {useRecoilCallback} from "recoil";
import axios from "axios";

import {projectDetailsState} from "./atoms";
import {LOADING} from "../loading/loading";
import {ProjectDetailsActions, ProjectDetailsData} from "./types";

const useProjectDetailsActions = (projectKey: string): ProjectDetailsActions => {
    const getProjectInfo = useRecoilCallback(({ set }) => async () => {
        set(projectDetailsState, { state: LOADING.PENDING })

        try {
            const { data } = await axios.get<ProjectDetailsData>(`/v1/projects/${projectKey}`);

            set(projectDetailsState, {
                state: LOADING.SUCCESS,
                data
            });
        } catch (e) {
            set(projectDetailsState, {
                state: LOADING.ERROR,
                error: {
                    code: e.code,
                    message: e.message
                }
            });
        }
    });

    return {
        getProjectInfo
    }
};

export default useProjectDetailsActions;