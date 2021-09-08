import { WorkItem } from "../../types/workItems";
import {useCallback} from "react";

type WorkItemDetailsProps = {
    data: WorkItem,
    onUpdate: (params: Partial<WorkItem>) => undefined
}

const WorkItemDetails = ({ data, onUpdate }: WorkItemDetailsProps) => {
    const changeResolvedStatus = useCallback(() => {
        onUpdate({
            resolved: !data.resolved
        })
    }, [data.resolved, onUpdate]);

    return <div>
        <h3>#{data.id} {data.name}</h3>
        <div>Status: {data.resolved ? 'resolved' : 'unresolved'}</div>
        <button onClick={changeResolvedStatus}>change</button>
    </div>
};

export default WorkItemDetails;