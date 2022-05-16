import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useUnitsListActions from '../../atoms/unitsList/actions';
import { useRecoilValue } from 'recoil';
import { unitsListState } from '../../atoms/unitsList/atoms';
import SimpleList from '../../components/SimpleList/SimpleList';

import styles from './UnitsList.module.scss';

const UnitsList: FC = () => {
  const { projectKey } = useParams<{ projectKey: string }>();
  const { fetchAll } = useUnitsListActions();
  const items = useRecoilValue(unitsListState);

  useEffect(() => {
    if (projectKey) {
      fetchAll(projectKey);
    }
  }, [fetchAll]);

  return (
    <SimpleList
      title="Units list"
      items={items}
      containerClassName={styles['units-list']}
    />
  );
};

export default UnitsList;
