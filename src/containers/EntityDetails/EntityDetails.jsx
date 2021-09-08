import {useEffect} from "react";
import { useParams } from 'react-router-dom';
import { useRecoilValue } from "recoil";

import workItemDetailsState, { useWorkItemDetails } from "../../atoms/workItemDetails/workItemDetails";
import WorkItemDetails from "../../components/WorkItemDetails/WorkItemDetails";

const EntityDetails = () => {
    const { id } = useParams()

    const workItemDetails = useRecoilValue(workItemDetailsState(id));
    const { fetchWorkItem, updateWorkItem } = useWorkItemDetails(id);

    useEffect(() => {
        fetchWorkItem();
    }, []);


    return workItemDetails ? <WorkItemDetails data={workItemDetails} onUpdate={updateWorkItem} /> : null;
};

export default EntityDetails;