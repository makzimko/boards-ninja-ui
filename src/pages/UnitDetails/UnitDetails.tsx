import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useUnitDetailsActions from '../../atoms/unitDetails/actions';
import { LOADING } from '../../atoms/loading';
import { useRecoilValue } from 'recoil';
import { unitDetailsState } from '../../atoms/unitDetails/atoms';

const UnitDetails = () => {
  const { id } = useParams();
  const { fetch } = useUnitDetailsActions();
  const [fetchStatus, setFetchStatus] = useState(LOADING.INITIAL);
  const unitDetails = useRecoilValue(unitDetailsState);

  useEffect(() => {
    setFetchStatus(LOADING.PENDING);

    if (id) {
      fetch(id)
        .then(() => setFetchStatus(LOADING.SUCCESS))
        .catch(() => setFetchStatus(LOADING.ERROR));
    }
  }, [id, fetch]);

  if (fetchStatus === LOADING.PENDING) {
    return <div>loading</div>;
  }

  if (fetchStatus === LOADING.ERROR) {
    return <div>error</div>;
  }

  return (
    <div>
      unit details {id} {JSON.stringify(unitDetails)}
    </div>
  );
};

export default UnitDetails;
