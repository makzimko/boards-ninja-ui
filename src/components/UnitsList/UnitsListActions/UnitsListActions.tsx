import React, { FC, useCallback, useState } from 'react';

import Button from '../../../ui/Button';
import Popup from '../../Popup/Popup';

import styles from './UnitsListActions.module.scss';

type UnitsListActionsProps = {
  listId: string;
};

const UnitsListActions: FC<UnitsListActionsProps> = () => {
  const [popupOpened, setPopupOpened] = useState(false);

  const togglePopup = useCallback(() => {
    setPopupOpened((opened) => !opened);
  }, [setPopupOpened]);

  return (
    <div className={styles.wrapper}>
      <Button appearance="ghost" variant="square" onClick={togglePopup}>
        ☰
      </Button>
      {popupOpened && (
        <Popup onMaskClick={togglePopup}>
          <div className={styles.actions}>
            <Button>Archive</Button>
            <Button>Remove</Button>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default UnitsListActions;
