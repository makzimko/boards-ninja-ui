import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';

import Button from '../../ui/Button';
import useUnitsActions, { UnitId, unitState } from '../../atoms/units';
import { listsListState } from '../../atoms/lists';
import { ComponentProps } from '../../types/component';
import Select from '../../ui/Select';
import { SelectChangeHandler } from '../../ui/Select/types';

import styles from './MoveUnit.module.scss';
import classNames from 'classnames';
import useNotificationActions from '../../atoms/notification/actions';

type MoveUnitProps = {
  id: UnitId;
} & ComponentProps;

const MoveUnit: FC<MoveUnitProps> = ({ id, containerClassName }) => {
  const { moveUnit } = useUnitsActions();
  const [newList, setNewList] = useState('');
  const unit = useRecoilValue(unitState(id));
  const lists = useRecoilValue(listsListState);
  const { notify } = useNotificationActions();

  const otherLists = useMemo(
    () => (unit ? lists.filter(({ id }) => id !== unit.list) : []),
    [lists, unit]
  );

  const handleListChange = useCallback<SelectChangeHandler>((value) => {
    setNewList(value);
  }, []);

  useEffect(() => {
    if (otherLists.length > 0) {
      setNewList(otherLists[0].id);
    }
  }, [otherLists]);

  const handleMove = useCallback(() => {
    if (id) {
      const listName = (
        otherLists.find(({ id }) => id === newList) || { name: 'another list' }
      ).name;
      moveUnit(id, newList).then(() =>
        notify(`Successfully moved to ${listName}`)
      );
    }
  }, [newList, moveUnit, lists]);

  return (
    <div className={classNames(styles.wrapper, containerClassName)}>
      <Select items={otherLists} onChange={handleListChange} value={newList} />
      <Button onClick={handleMove}>Move</Button>
    </div>
  );
};

export default MoveUnit;
