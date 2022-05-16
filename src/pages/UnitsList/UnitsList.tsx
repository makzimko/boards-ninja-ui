import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useUnitsListActions from '../../atoms/unitsList/actions';
import { useRecoilValue } from 'recoil';
import { unitsListState } from '../../atoms/unitsList/atoms';
import SimpleList from '../../components/SimpleList/SimpleList';

const UnitsList: FC = () => {
  const { projectKey } = useParams<{ projectKey: string }>();
  const { fetchAll } = useUnitsListActions();
  const items = useRecoilValue(unitsListState);

  useEffect(() => {
    if (projectKey) {
      fetchAll(projectKey);
    }
  }, [fetchAll]);

  return <SimpleList items={items} />;
};

export default UnitsList;
