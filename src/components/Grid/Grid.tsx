import React, { FC, useCallback, useMemo } from 'react';

import GridRow, { GridRowCellClickHandler } from './GridRow/GridRow';

import styles from './Grid.module.scss';

type GridProps = {
  items: {
    id: string;
    [key: string]: unknown;
  }[];
  columns: {
    field: string;
  }[];
  onCellClick?: GridRowCellClickHandler;
};

const Grid: FC<GridProps> = ({ items, columns, onCellClick }) => {
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
          <GridRow key={id} id={id} items={items} onCellClick={onCellClick} />
        ))}
      </div>
    </div>
  );
};

export default Grid;
