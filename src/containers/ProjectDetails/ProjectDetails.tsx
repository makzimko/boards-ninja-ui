import useProjectDetailsActions, {projectDetailsLoadingState, projectDetailsState} from "../../atoms/projectDetails";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {LOADING} from "../../atoms/loading/loading";

const ProjectDetails = () => {
    const { key } = useParams();
    const { getProjectInfo } = useProjectDetailsActions();

    const projectDetails = useRecoilValue(projectDetailsState);

    useEffect(() => {
        getProjectInfo(key)
    }, []);

    if (projectDetails.state === LOADING.ERROR ) {
        return 'Error occurred while loading data!'
    }

    if (projectDetails.state === LOADING.SUCCESS ) {
        return <div>
            <h1>{projectDetails.data.name}</h1>
            <h4>{projectDetails.data.key}</h4>
        </div>
    }

    return 'Waiting for project details loading...'
};

export default ProjectDetails;