import React, { FC, useCallback, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';

import Button from '../../../ui/Button';
import Popup from '../../Popup/Popup';
import Menu from '../../Menu/Menu';
import { MenuItemClickHandler } from '../../Menu/types';
import useListsActions, { listIdsState } from '../../../atoms/lists';

import styles from './UnitsListActions.module.scss';

type UnitsListActionsProps = {
  listId: string;
};

const items = [
  { id: 'archive', name: 'Move to archive' },
  { id: 'remove', name: 'Remove list' },
];

const UnitsListActions: FC<UnitsListActionsProps> = ({ listId }) => {
  const [popupOpened, setPopupOpened] = useState(false);

  const { remove } = useListsActions();
  const lists = useRecoilValue(listIdsState);

  const togglePopup = useCallback(() => {
    setPopupOpened((opened) => !opened);
  }, [setPopupOpened]);

  const actions: Record<string, () => void> = useMemo(
    () => ({
      archive: () => console.log('archive'),
      remove: () => remove(listId, lists.slice(-1)[0]),
    }),
    [listId]
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
    <div className={styles.wrapper}>
      <Button appearance="ghost" variant="square" onClick={togglePopup}>
        ☰
      </Button>
      {popupOpened && (
        <Popup onMaskClick={togglePopup}>
          <Menu items={items} onItemClick={itemClickHandler} />
        </Popup>
      )}
    </div>
  );
};

export default UnitsListActions;
