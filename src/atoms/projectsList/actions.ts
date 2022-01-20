import {useRecoilCallback} from "recoil";
import axios from "axios";

import {projectsListLoadingState, projectsListState} from "./atoms";
import {LOADING} from "../loading/loading";
import {Project} from "./types";

const useProjectsListActions = () => {
    const fetchAll = useRecoilCallback(({ set }) => async () => {
        set(projectsListLoadingState, LOADING.PENDING);

        try {
            const { data } = await axios.get<Project[]>('/v1/projects');

            set(projectsListLoadingState, LOADING.SUCCESS);
            set(projectsListState, data);
        } catch (e) {
            set(projectsListLoadingState, LOADING.ERROR);
        }
    });

    return {
        fetchAll
    };
}

export default useProjectsListActions;