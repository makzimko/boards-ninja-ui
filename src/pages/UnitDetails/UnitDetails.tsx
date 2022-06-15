import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
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
import Button from '../../ui/Button';
import useListsActions, { listsListState } from '../../atoms/lists';

const UNIT_DETAILS_FIELD = ['_id', 'name', 'completed', 'project', 'list'];
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
  const { id, projectKey } = useParams();
  const { fetch, update, remove, moveUnit } = useUnitDetailsActions();
  const [fetchStatus, setFetchStatus] = useState(LOADING.INITIAL);
  const unitDetails = useRecoilValue(unitDetailsState);
  const navigate = useNavigate();
  const { fetch: fetchLists } = useListsActions();
  const lists = useRecoilValue(listsListState);
  const otherLists = useMemo(
    () =>
      unitDetails ? lists.filter(({ id }) => id !== unitDetails.list) : [],
    [lists, unitDetails]
  );
  const [newList, setNewList] = useState('');

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
      fetch(id)
        .then(() => setFetchStatus(LOADING.SUCCESS))
        .catch(() => setFetchStatus(LOADING.ERROR));
    }
  }, [id, fetch]);

  useEffect(() => {
    if (otherLists.length > 0) {
      setNewList(otherLists[0].id);
    }
  }, [otherLists]);

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

  const handleListChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    ({ currentTarget }) => {
      setNewList(currentTarget.value);
    },
    []
  );

  const handleMove = useCallback(() => {
    if (id) {
      moveUnit(id, newList);
    }
  }, [newList, moveUnit]);

  if ([LOADING.INITIAL, LOADING.PENDING].includes(fetchStatus)) {
    return <div>loading</div>;
  }

  if (fetchStatus === LOADING.ERROR) {
    return <div>error</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.actions}>
        <Button onClick={changeCompleteness}>
          Set as {unitDetails.completed ? 'incomplete' : 'completed'}
        </Button>
        <Button onClick={handleRemove}>Remove</Button>
      </div>
      {otherLists.length > 0 && (
        <div>
          <select onChange={handleListChange} value={newList}>
            {otherLists.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          <Button onClick={handleMove}>Move</Button>
        </div>
      )}
      <Grid
        items={gridData}
        columns={UNIT_DETAILS_GRID_COLUMNS}
        onCellClick={console.log.bind('CLICK')}
      />
    </div>
  );
};

export default UnitDetails;
