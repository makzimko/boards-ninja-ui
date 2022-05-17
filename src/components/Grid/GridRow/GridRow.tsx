import React, { FC, MouseEventHandler, useCallback } from 'react';
import classNames from 'classnames';

import { GridRowCellClickHandler, RowItem } from '../types';

import styles from './GridRow.module.scss';

type GridRowProps = {
  id: string;
  items: RowItem[];
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
      {items.map(({ field, value, clickable }) => (
        <div
          className={classNames(styles.cell, {
            [styles.clickable]: onCellClick && clickable,
          })}
          key={field}
          data-field={field}
          onClick={clickable ? handleCellClick : undefined}
        >
          {value as string}
        </div>
      ))}
    </div>
  );
};

export default GridRow;
