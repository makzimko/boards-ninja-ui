import React, { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useUnitsListActions from '../../atoms/unitsList/actions';
import { useRecoilValue } from 'recoil';
import { unitsListState } from '../../atoms/unitsList/atoms';
import SimpleList from '../../components/SimpleList/SimpleList';
import InlineCreate from '../../components/InlineCreate/InlineCreate';

import styles from './UnitsList.module.scss';

const UnitsList: FC = () => {
  const { projectKey } = useParams<{ projectKey: string }>();
  const { fetchAll, createSimpleUnit } = useUnitsListActions();
  const items = useRecoilValue(unitsListState);
  const [newItemName, setNewItemName] = useState('');

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

  useEffect(() => {
    if (projectKey) {
      fetchAll(projectKey);
    }
  }, [fetchAll]);

  return (
    <div className={styles.wrapper}>
      <SimpleList title="Units list" items={items} />
      <InlineCreate
        containerClassName={styles['add-item']}
        onSubmit={createNewItem}
        defaultValue={newItemName}
      />
    </div>
  );
};

export default UnitsList;
