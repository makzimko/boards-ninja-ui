import React, { FC, useMemo } from 'react';

import GridRow from './GridRow/GridRow';

import styles from './Grid.module.scss';

type GridProps = {
  items: {
    id: string;
    [key: string]: unknown;
  }[];
  columns: {
    field: string;
  }[];
};

const Grid: FC<GridProps> = ({ items, columns }) => {
  const rows = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        items: columns.map(({ field }) => ({ field, value: item[field] })),
      })),
    [items, columns]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles['rows-container']}>
        {rows.map(({ id, items }) => (
          <GridRow key={id} items={items} />
        ))}
      </div>
    </div>
  );
};

export default Grid;
