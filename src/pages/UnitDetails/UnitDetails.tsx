import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';

import { LOADING } from '../../atoms/loading';
import Button from '../../ui/Button';
import useUnitsActions, { unitState } from '../../atoms/units';
import useListsActions from '../../atoms/lists';

import styles from './UnitDetails.module.scss';

import Grid, {
  GridColumn,
  GridColumnFormatter,
  GridItem,
} from '../../components/Grid';
import MoveUnit from '../../components/MoveUnit/MoveUnit';
import InlineTextEdit, {
  InlineTextEditSubmitHandler,
} from '../../components/InlineTextEdit';
import useNotificationActions from '../../atoms/notification/actions';
import { NotificationType } from '../../atoms/notification';

const UNIT_DETAILS_FIELD = ['id', 'name', 'completed', 'project', 'list'];
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
  const { fetchById, removeById, updateById } = useUnitsActions();
  const { id, projectKey } = useParams();
  const [fetchStatus, setFetchStatus] = useState(LOADING.INITIAL);
  const unitDetails = useRecoilValue(unitState(id ?? ''));
  const { fetch: fetchLists } = useListsActions();
  const { notify } = useNotificationActions();

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
    if (projectKey) {
      fetchLists(projectKey);
    }
  }, [fetchLists, projectKey]);

  useEffect(() => {
    setFetchStatus(LOADING.PENDING);

    if (id) {
      fetchById(id)
        .then(() => setFetchStatus(LOADING.SUCCESS))
        .catch(() => setFetchStatus(LOADING.ERROR));
    }
  }, [id, fetchById]);

  const changeCompleteness = useCallback(() => {
    if (id && unitDetails) {
      updateById(id, { completed: !unitDetails.completed }).then(() =>
        notify(
          unitDetails.completed
            ? 'Marked as not completed'
            : 'Marked as completed',
          { type: NotificationType.Success }
        )
      );
    }
  }, [updateById, unitDetails]);

  const handleNameChange = useCallback<InlineTextEditSubmitHandler>(
    (name) => {
      if (id && name) {
        updateById(id, { name });
      }
    },
    [updateById, id]
  );

  const handleRemove = useCallback(() => {
    if (id) {
      removeById(id);
      // remove(id).then(() => {
      //   // TODO: make redirect to project
      //   navigate(`/projects/${unitDetails.project}/units`);
      // });
    }
  }, [unitDetails, removeById]);

  if ([LOADING.INITIAL, LOADING.PENDING].includes(fetchStatus)) {
    return <div>loading</div>;
  }

  if (fetchStatus === LOADING.ERROR) {
    return <div>error</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.name}>
        <InlineTextEdit
          value={unitDetails.name}
          onSubmit={handleNameChange}
          inputClassName={styles['title-input']}
          valueClassName={styles['title-value']}
        />
      </div>
      <div className={styles.actions}>
        <Button onClick={changeCompleteness}>
          Set as {unitDetails.completed ? 'incomplete' : 'completed'}
        </Button>
        <Button onClick={handleRemove}>Remove</Button>
      </div>
      {id && <MoveUnit id={id} />}
      <Grid
        items={gridData}
        columns={UNIT_DETAILS_GRID_COLUMNS}
        onCellClick={console.log.bind('CLICK')}
      />
    </div>
  );
};

export default UnitDetails;
