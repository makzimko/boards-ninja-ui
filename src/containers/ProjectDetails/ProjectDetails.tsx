import {useEffect} from "react";
import {useParams} from "react-router-dom";

import useProjectDetails from "../../atoms/projectDetails";
import {LOADING} from "../../atoms/loading/loading";
import useUnitsList from "../../atoms/unitsList";

const ProjectDetails = () => {
    const { key } = useParams();

    const [projectDetails, { getProjectInfo }] = useProjectDetails(key);
    const [unitsList, { loadMore }] = useUnitsList(key);

    useEffect(() => {
        getProjectInfo();
        loadMore();
    }, [])

    if (projectDetails.state === LOADING.ERROR ) {
        return 'Error occurred while loading data!'
    }

    if (projectDetails.state === LOADING.SUCCESS ) {
        return <div>
            <h1>{projectDetails.data.name}</h1>
            <h4>{projectDetails.data.key}</h4>
            <hr />
            <div>is loading: {unitsList.isLoading}</div>
            <div>total count: {unitsList.totalCount}</div>
            <div>units loaded: {unitsList.count}</div>
            <div>has more: {unitsList.hasMore ? 'yes' : 'no'}</div>
            <ul>
                {unitsList.items.map(({ _id, name }) =>
                    <li key={_id}>{name}</li>
                )}
            </ul>
            {unitsList.hasMore && <button onClick={loadMore}>load more</button>}
        </div>
    }

    return 'Waiting for project details loading...'
};

export default ProjectDetails;