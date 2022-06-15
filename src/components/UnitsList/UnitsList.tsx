import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import useUnitsActions from '../../atoms/units/actions';
import { listUnitsState } from '../../atoms/units/atoms';
import SimpleList from '../SimpleList';
import { GridRowStatusColorFormatter } from '../Grid';
import { Unit } from '../../types/unit';
import InlineCreate from '../InlineCreate/InlineCreate';

import UnitsListActions from './UnitsListActions/UnitsListActions';
import UnitsListUnitActions from './UnitsListUnitActions/UnitsListUnitActions';
import styles from './UnitsList.module.scss';

const statusColorFormatter: GridRowStatusColorFormatter = (value) => {
  const { completed } = value as unknown as Unit;

  if (completed) {
    return '#E6E9EE';
  }
};

type UnitsListProps = {
  id: string;
  name: string;
  predefined: boolean;
};

const UnitsList: FC<UnitsListProps> = ({ id, name, predefined = false }) => {
  const { fetchByListId, createUnitInList } = useUnitsActions();
  const listUnits = useRecoilValue(listUnitsState(id));
  const [newItemName, setNewItemName] = useState('');
  const navigate = useNavigate();

  const formattedUnitsList = useMemo(
    () =>
      listUnits.map(({ id, name, completed }) => ({
        id,
        name,
        completed,
      })),
    [listUnits]
  );

  const createNewItem = useCallback((value: string) => {
    if (value && id) {
      setNewItemName(value);

      createUnitInList({
        name: value,
        listId: id,
      }).then(() => {
        setNewItemName('');
      });
    }
  }, []);

  const goToUnit = useCallback((id: string) => {
    navigate(`units/${id}`);
  }, []);

  useEffect(() => {
    fetchByListId(id);
  }, [id, fetchByListId]);

  return (
    <div className={styles.wrapper}>
      <SimpleList
        title={predefined ? 'Units backlog' : name}
        items={formattedUnitsList}
        onItemClick={goToUnit}
        headerExtraContent={<UnitsListActions listId={id} />}
        statusColorFormatter={statusColorFormatter}
        rowDetails={UnitsListUnitActions}
      />
      <InlineCreate
        containerClassName={styles['add-item']}
        onSubmit={createNewItem}
        defaultValue={newItemName}
      />
    </div>
  );
};

export default UnitsList;
