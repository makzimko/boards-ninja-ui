import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useUnitsListActions from '../../atoms/unitsList/actions';
import { useRecoilValue } from 'recoil';
import { unitsListState } from '../../atoms/unitsList/atoms';
import SimpleList from '../../components/SimpleList';
import InlineCreate from '../../components/InlineCreate/InlineCreate';

import styles from './UnitsList.module.scss';

const UnitsList: FC = () => {
  const { projectKey } = useParams<{ projectKey: string }>();
  const { fetchAll, createSimpleUnit } = useUnitsListActions();
  const unitsList = useRecoilValue(unitsListState);
  const [newItemName, setNewItemName] = useState('');
  const navigate = useNavigate();

  const formattedUnitsList = useMemo(
    () =>
      unitsList.map(({ _id, name }) => ({
        id: _id,
        name,
      })),
    [unitsList]
  );

  const createNewItem = useCallback((value: string) => {
    if (value && projectKey) {
      setNewItemName(value);

      createSimpleUnit({
        name: value,
        projectKey,
      }).then(() => {
        setNewItemName('');
      });
    }
  }, []);

  const goToUnit = useCallback((id: string) => {
    navigate(`/projects/${projectKey}/units/${id}`);
  }, []);

  useEffect(() => {
    if (projectKey) {
      fetchAll(projectKey);
    }
  }, [fetchAll]);

  return (
    <div className={styles.wrapper}>
      <SimpleList
        title="Units list"
        items={formattedUnitsList}
        onItemClick={goToUnit}
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
