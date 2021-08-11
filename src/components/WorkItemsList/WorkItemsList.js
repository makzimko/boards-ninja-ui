import WorkItem from "./WorkItem";

const WorkItemsList = ({ items, resolveItem }) => {
    return <div>
        {items.map(({ id, name, resolved }) =>
            <WorkItem key={id} id={id} name={name} resolved={resolved} />
        )}
    </div>
};

export default WorkItemsList;