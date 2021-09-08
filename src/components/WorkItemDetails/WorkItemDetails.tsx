import { WorkItem } from "../../types/workItems";
import {useCallback, useMemo} from "react";

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

    const moveToArchive = useCallback(() => {
        onUpdate({
            archived: true
        })
    }, [changeResolvedStatus]);

    const status = useMemo(() => {
        if (data.archived) {
            return 'archived'
        }
        if (data.resolved) {
            return 'resolved'
        } else {
            return 'unresolved'
        }
    }, [data.resolved, data.archived]);

    return <div>
        <h3>#{data.id} {data.name}</h3>
        <div>Status: {status}</div>
        {!data.archived &&
            <>
                <button onClick={changeResolvedStatus}>Change resolving status</button>
                <button onClick={moveToArchive}>Move to archive</button>
            </>
        }
    </div>
};

export default WorkItemDetails;