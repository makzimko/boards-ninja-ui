import React, { FC, useMemo } from 'react';

import {
  GridColumn,
  GridColumnFormatter,
  GridItem,
  GridRowStatusColorFormatter,
  RowItem,
} from './types';
import GridRow, { GridRowProps } from './GridRow/GridRow';

import styles from './Grid.module.scss';

export type GridProps = {
  items: GridItem[];
  columns: GridColumn[];
  statusColorFormatter?: GridRowStatusColorFormatter;
} & Omit<GridRowProps, 'id' | 'items' | 'statusColor'>;

const defaultFormatter: GridColumnFormatter = (_, value: unknown) => value;

const Grid: FC<GridProps> = ({
  items,
  columns,
  statusColorFormatter = () => undefined,
  ...rest
}) => {
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
        statusColor: statusColorFormatter(item),
      })),
    [items, columns]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles['rows-container']}>
        {rows.map(({ id, items, statusColor }) => (
          <GridRow
            key={id}
            id={id}
            items={items}
            statusColor={statusColor}
            {...rest}
          />
        ))}
      </div>
    </div>
  );
};

export default Grid;
