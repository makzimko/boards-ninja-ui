import React from 'react';
import { useParams } from 'react-router-dom';

const UnitDetails = () => {
  const { id } = useParams();
  return <div>unit details {id} </div>;
};

export default UnitDetails;
