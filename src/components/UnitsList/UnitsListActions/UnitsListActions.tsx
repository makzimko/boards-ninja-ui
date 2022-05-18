import React, { FC } from 'react';
import Button from '../../../ui/Button';

import styles from './UnitsListActions.module.scss';

const UnitsListActions: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Button>Archive</Button>
      <Button>Remove</Button>
    </div>
  );
};

export default UnitsListActions;
