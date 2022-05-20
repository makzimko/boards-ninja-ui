import React, { FC, useMemo } from 'react';

import {
  GridColumn,
  GridColumnFormatter,
  GridItem,
  GridMoreButtonClickHandler,
  GridRowCellClickHandler,
  GridRowStatusColorFormatter,
  RowItem,
} from './types';
import GridRow from './GridRow/GridRow';

import styles from './Grid.module.scss';

type GridProps = {
  items: GridItem[];
  columns: GridColumn[];
  onCellClick?: GridRowCellClickHandler;
  statusColorFormatter?: GridRowStatusColorFormatter;
  onMoreButtonClick?: GridMoreButtonClickHandler;
};

const defaultFormatter: GridColumnFormatter = (_, value: unknown) => value;

const Grid: FC<GridProps> = ({
  items,
  columns,
  onCellClick,
  statusColorFormatter = () => undefined,
  onMoreButtonClick,
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
            onCellClick={onCellClick}
            statusColor={statusColor}
            onMoreButtonClick={onMoreButtonClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Grid;
