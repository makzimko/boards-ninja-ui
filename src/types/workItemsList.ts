import { WorkItem } from "./workItems";

export type WorkItemsList = {
    data: Array<WorkItem>,
    totalCount: number | undefined,
    isLoading: boolean
}