import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import useUnitsListActions from '../../atoms/unitsList/actions';
import SimpleList from '../SimpleList';
import { unitsListState } from '../../atoms/unitsList/atoms';
import { GridRowStatusColorFormatter } from '../Grid';
import { Unit } from '../../types/unit';
import InlineCreate from '../InlineCreate/InlineCreate';

import styles from './UnitsList.module.scss';
import UnitsListActions from './UnitsListActions/UnitsListActions';

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
  const { fetchByList, addUnitToList } = useUnitsListActions();
  const unitsList = useRecoilValue(unitsListState(id));
  const [newItemName, setNewItemName] = useState('');
  const navigate = useNavigate();

  const formattedUnitsList = useMemo(
    () =>
      unitsList.map(({ _id, name, completed }) => ({
        id: _id,
        name,
        completed,
      })),
    [unitsList]
  );

  const createNewItem = useCallback((value: string) => {
    if (value && id) {
      setNewItemName(value);

      addUnitToList({
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
    fetchByList(id);
  }, [id, fetchByList]);

  return (
    <div className={styles.wrapper}>
      <SimpleList
        title={predefined ? 'Units backlog' : name}
        items={formattedUnitsList}
        onItemClick={goToUnit}
        headerExtraContent={<UnitsListActions listId={id} />}
        statusColorFormatter={statusColorFormatter}
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
