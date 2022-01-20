import {atom} from "recoil";
import {ProjectDetails} from "./types";
import loadingState from "../loading/loading";

export const projectDetailsState = atom<ProjectDetails | undefined>({
    key: 'ProjectDetails',
    default: undefined
});

export const projectDetailsLoadingState = loadingState("ProjectDetails");