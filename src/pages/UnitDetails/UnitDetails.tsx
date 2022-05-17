import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';

import useUnitDetailsActions from '../../atoms/unitDetails/actions';
import { LOADING } from '../../atoms/loading';
import { unitDetailsState } from '../../atoms/unitDetails/atoms';

import styles from './UnitDetails.module.scss';
import Grid, {
  GridColumn,
  GridColumnFormatter,
  GridItem,
} from '../../components/Grid';

const UNIT_DETAILS_FIELD = ['_id', 'name', 'project', 'completed'];
const valueFormatter: GridColumnFormatter = ({ id }, value) => {
  if (id === 'completed') {
    return (value as boolean).toString();
  }
  return value;
};
const UNIT_DETAILS_GRID_COLUMNS: GridColumn[] = [
  { field: 'name', clickable: true },
  {
    field: 'value',
    formatter: valueFormatter,
  },
];

const UnitDetails = () => {
  const { id } = useParams();
  const { fetch, update, remove } = useUnitDetailsActions();
  const [fetchStatus, setFetchStatus] = useState(LOADING.INITIAL);
  const unitDetails = useRecoilValue(unitDetailsState);
  const navigate = useNavigate();

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

  const changeCompleteness = useCallback(() => {
    if (id && unitDetails) {
      update(id, { completed: !unitDetails.completed });
    }
  }, [update, unitDetails]);

  const handleRemove = useCallback(() => {
    if (id) {
      remove(id).then(() => {
        // TODO: make redirect to project
        navigate(`/projects/${unitDetails.project}/units`);
      });
    }
  }, [remove, unitDetails]);

  if ([LOADING.INITIAL, LOADING.PENDING].includes(fetchStatus)) {
    return <div>loading</div>;
  }

  if (fetchStatus === LOADING.ERROR) {
    return <div>error</div>;
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={changeCompleteness}>
        Set as {unitDetails.completed ? 'incomplete' : 'completed'}
      </button>
      <button onClick={handleRemove}>Remove</button>
      <br />
      <br />
      <Grid
        items={gridData}
        columns={UNIT_DETAILS_GRID_COLUMNS}
        onCellClick={console.log.bind('CLICK')}
      />
    </div>
  );
};

export default UnitDetails;
