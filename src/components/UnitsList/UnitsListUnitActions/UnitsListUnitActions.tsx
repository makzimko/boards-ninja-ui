import React, { FC, useCallback, useMemo } from 'react';

import { GridRowDetailsProps } from '../../Grid';
import Popup from '../../Popup/Popup';
import Menu from '../../Menu/Menu';
import { MenuDivider, MenuItemClickHandler } from '../../Menu/types';
import { useNavigate } from 'react-router-dom';
import useUnitsActions from '../../../atoms/units';

const items = [
  { id: 'details', name: 'Show details' },
  MenuDivider,
  { id: 'complete', name: 'Set as completed' },
  { id: 'move', name: 'Move to another list' },
  MenuDivider,
  { id: 'remove', name: 'Remove item' },
];

const UnitsListUnitActions: FC<GridRowDetailsProps> = ({ id, close }) => {
  const navigate = useNavigate();
  const { removeById } = useUnitsActions();

  const actions: Record<string, () => void> = useMemo(
    () => ({
      details: () => navigate(`units/${id}`),
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
    <Popup onMaskClick={close}>
      <Menu items={items} onItemClick={itemClickHandler} />
    </Popup>
  );
};

export default UnitsListUnitActions;
