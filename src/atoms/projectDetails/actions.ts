import {useRecoilCallback} from "recoil";
import axios from "axios";

import {projectDetailsLoadingState, projectDetailsState} from "./atoms";
import {LOADING} from "../loading/loading";
import {ProjectDetails} from "./types";

const useProjectDetailsActions = () => {
    const getProjectInfo = useRecoilCallback(({ set }) => async (projectKey: string) => {
        set(projectDetailsState, { state: LOADING.PENDING })

        try {
            const { data } = await axios.get<ProjectDetails>(`/v1/projects/${projectKey}`);

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
            })
            set(projectDetailsLoadingState, LOADING.ERROR);
        }
    });

    return {
        getProjectInfo
    }
};

export default useProjectDetailsActions;