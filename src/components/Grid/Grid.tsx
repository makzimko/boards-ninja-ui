import React, { FC, useMemo } from 'react';

import {
  ColumnFormatter,
  GridColumn,
  GridItem,
  GridRowCellClickHandler,
  RowItem,
} from './types';
import GridRow from './GridRow/GridRow';

import styles from './Grid.module.scss';

type GridProps = {
  items: GridItem[];
  columns: GridColumn[];
  onCellClick?: GridRowCellClickHandler;
};

const defaultFormatter: ColumnFormatter = (_, value: unknown) => value;

const Grid: FC<GridProps> = ({ items, columns, onCellClick }) => {
  const rows = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        items: columns.map<RowItem>(
          ({ field, formatter = defaultFormatter, ...rest }) => ({
            field,
            value: formatter({ id: item.id, name: field }, item[field]),
            ...rest,
          })
        ),
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
