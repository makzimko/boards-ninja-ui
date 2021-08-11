const WorkItem = ({ id, name, resolved }) => {
    return <div style={{ textDecoration: resolved ? 'line-through': ''}}>
        {name}
    </div>
};

export default WorkItem;