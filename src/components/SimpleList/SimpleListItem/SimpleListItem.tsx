import React, { FC } from 'react';

import styles from './SimpleListItem.module.scss';

type SimpleListItemProps = {
  name: string;
};

const SimpleListItem: FC<SimpleListItemProps> = ({ name }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.status} />
      <div className={styles.name}>{name}</div>
    </div>
  );
};

export default SimpleListItem;
