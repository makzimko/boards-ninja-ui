import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';

import useUnitDetailsActions from '../../atoms/unitDetails/actions';
import { LOADING } from '../../atoms/loading';
import { unitDetailsState } from '../../atoms/unitDetails/atoms';

import styles from './UnitDetails.module.scss';
import { Grid, GridItem } from '../../components/Grid';

const UNIT_DETAILS_FIELD = ['_id', 'name', 'project', 'completed'];

const UnitDetails = () => {
  const { id } = useParams();
  const { fetch } = useUnitDetailsActions();
  const [fetchStatus, setFetchStatus] = useState(LOADING.INITIAL);
  const unitDetails = useRecoilValue(unitDetailsState);

  const gridData = useMemo<GridItem[]>(() => {
    if (!unitDetails) {
      return [];
    }

    return UNIT_DETAILS_FIELD.map((fieldName) => ({
      id: fieldName,
      name: fieldName,
      value: unitDetails[fieldName as keyof typeof unitDetails],
    }));
  }, [unitDetails]);

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
    <div className={styles.wrapper}>
      <Grid
        items={gridData}
        columns={[{ field: 'name', clickable: true }, { field: 'value' }]}
        onCellClick={console.log.bind('CLICK')}
      />
    </div>
  );
};

export default UnitDetails;
