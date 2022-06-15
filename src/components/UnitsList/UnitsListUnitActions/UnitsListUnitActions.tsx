import React, { FC, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GridRowDetailsProps } from '../../Grid';
import Popup from '../../Popup/Popup';
import Menu from '../../Menu/Menu';
import { MenuDivider, MenuItemClickHandler } from '../../Menu/types';
import useUnitsActions from '../../../atoms/units';
import MoveUnit from '../../MoveUnit/MoveUnit';

import styles from './UnitsListUnitActions.module.scss';

const items = [
  { id: 'details', name: 'Show details' },
  MenuDivider,
  { id: 'complete', name: 'Toggle completeness' },
  { id: 'move', name: 'Move to another list' },
  MenuDivider,
  { id: 'remove', name: 'Remove item' },
];

const UnitsListUnitActions: FC<GridRowDetailsProps> = ({ id, close }) => {
  const navigate = useNavigate();
  const { removeById, toggleCompleteness } = useUnitsActions();

  const [moving, setMoving] = useState(false);

  const actions: Record<string, () => void> = useMemo(
    () => ({
      details: () => navigate(`units/${id}`),
      complete: () => toggleCompleteness(id).then(close),
      move: () => {
        setMoving(true);
      },
      remove: () => removeById(id).then(close),
    }),
    [navigate, id]
  );

  const itemClickHandler: MenuItemClickHandler = useCallback(
    (id) => {
      const action = actions[id];

      if (action) {
        action();
      }
    },
    [actions]
  );

  return (
    <div>
      {!moving && (
        <Popup onMaskClick={close}>
          <Menu items={items} onItemClick={itemClickHandler} />
        </Popup>
      )}
      {moving && (
        <Popup onMaskClick={close}>
          <MoveUnit id={id} containerClassName={styles['move-units']} />
        </Popup>
      )}
    </div>
  );
};

export default UnitsListUnitActions;
