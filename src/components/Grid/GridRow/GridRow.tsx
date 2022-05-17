import React, { FC, MouseEventHandler, useCallback } from 'react';

import styles from './GridRow.module.scss';

export type GridRowCellClickHandler = (options: {
  id: string;
  field: string;
}) => void;

type GridRowProps = {
  id: string;
  items: {
    field: string;
    value: unknown;
  }[];
  onCellClick?: GridRowCellClickHandler;
};

const GridRow: FC<GridRowProps> = ({ id, items, onCellClick }) => {
  const handleCellClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    ({ currentTarget }) => {
      const { field } = currentTarget.dataset;

      if (field && onCellClick) {
        onCellClick({ id, field });
      }
    },
    [onCellClick, id]
  );
  return (
    <div className={styles.wrapper}>
      <div className={styles.status} />
      {items.map(({ field, value }) => (
        <div
          className={styles.cell}
          key={field}
          data-field={field}
          onClick={handleCellClick}
        >
          {value as string}
        </div>
      ))}
    </div>
  );
};

export default GridRow;
