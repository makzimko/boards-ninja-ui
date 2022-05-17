import React, { FC, useMemo } from 'react';

import { GridColumn, GridRowCellClickHandler, RowItem } from './types';
import GridRow from './GridRow/GridRow';

import styles from './Grid.module.scss';

type GridProps = {
  items: {
    id: string;
    [key: string]: unknown;
  }[];
  columns: GridColumn[];
  onCellClick?: GridRowCellClickHandler;
};

const Grid: FC<GridProps> = ({ items, columns, onCellClick }) => {
  const rows = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        items: columns.map<RowItem>(({ field, ...rest }) => ({
          field,
          value: item[field],
          ...rest,
        })),
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
