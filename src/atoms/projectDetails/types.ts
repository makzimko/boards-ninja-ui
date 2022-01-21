import {LoadableData} from "../loadableData/loadableData";

export type ProjectDetailsData = {
    name: string;
    key: string;
}
export type ProjectDetailsActions = {
    getProjectInfo: () => void
}

export type ProjectDetails = [LoadableData<ProjectDetailsData>, ProjectDetailsActions]