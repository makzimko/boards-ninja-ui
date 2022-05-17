import React, { FC } from 'react';

import styles from './GridRow.module.scss';

type GridRowProps = {
  items: {
    field: string;
    value: unknown;
  }[];
};

const GridRow: FC<GridRowProps> = ({ items }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.status} />
      {items.map(({ field, value }) => (
        <div className={styles.cell} key={field}>
          {value as string}
        </div>
      ))}
    </div>
  );
};

export default GridRow;
