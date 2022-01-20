import {ProjectDetails} from "./types";
import loadingState from "../loading/loading";
import loadableData from "../loadableData/loadableData";


export const projectDetailsState = loadableData<ProjectDetails>('ProjectDetails');

export const projectDetailsLoadingState = loadingState("ProjectDetails");