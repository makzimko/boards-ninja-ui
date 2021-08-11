import { useParams } from 'react-router-dom';

const EntityDetails = () => {
    const { id } = useParams()
    return <div>Entity: {JSON.stringify(id)}</div>
};

export default EntityDetails;