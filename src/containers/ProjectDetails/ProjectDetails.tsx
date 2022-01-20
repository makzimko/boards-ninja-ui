import useProjectDetailsActions, {projectDetailsLoadingState, projectDetailsState} from "../../atoms/projectDetails";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {LOADING} from "../../atoms/loading/loading";

const ProjectDetails = () => {
    const { key } = useParams();
    const { getProjectInfo } = useProjectDetailsActions();

    const projectDetailsLoading = useRecoilValue(projectDetailsLoadingState);
    const projectDetails = useRecoilValue(projectDetailsState);

    useEffect(() => {
        getProjectInfo(key)
    }, []);

    if ([LOADING.INITIAL, LOADING.PENDING].includes(projectDetailsLoading)) {
        return 'Waiting for project details loading...'
    }

    if (projectDetailsLoading === LOADING.ERROR ) {
        return 'Error occurred while loading data!'
    }

    return <div>
        <h1>{projectDetails!.name}</h1>
        <h4>{projectDetails!.key}</h4>
    </div>
};

export default ProjectDetails;