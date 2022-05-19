import React, { FC, ReactNode, useMemo } from 'react';
import { createPortal } from 'react-dom';

import styles from './Popup.module.scss';
import classNames from 'classnames';

type PopupProps = {
  children: ReactNode;
  maskClassName?: string;
  onMaskClick?: () => void;
};

const Popup: FC<PopupProps> = ({ children, maskClassName, onMaskClick }) => {
  const popupContent = useMemo(
    () => (
      <div className={styles.wrapper}>
        <div
          className={classNames(styles.mask, maskClassName)}
          onClick={onMaskClick}
        ></div>
        <div className={styles.content}>{children}</div>
      </div>
    ),
    [children]
  );

  return createPortal(
    popupContent,
    document.getElementById('popup') as HTMLElement
  );
};

export default Popup;
