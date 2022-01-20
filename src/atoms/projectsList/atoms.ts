import {atom} from "recoil";
import {Project} from "./types";
import loadingState from "../loading/loading";

export const projectsListState = atom<Project[]>({
    key: 'ProjectsList',
    default: []
});

export const projectsListLoadingState = loadingState('ProjectsListLoading');

