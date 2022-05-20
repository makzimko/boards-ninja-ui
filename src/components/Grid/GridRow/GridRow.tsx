import React, { FC, MouseEventHandler, useCallback } from 'react';
import classNames from 'classnames';

import {
  GridMoreButtonClickHandler,
  GridRowCellClickHandler,
  RowItem,
} from '../types';
import Button from '../../../ui/Button';

import styles from './GridRow.module.scss';

type GridRowProps = {
  id: string;
  items: RowItem[];
  onCellClick?: GridRowCellClickHandler;
  statusColor?: string;
  onMoreButtonClick?: GridMoreButtonClickHandler;
};

const GridRow: FC<GridRowProps> = ({
  id,
  items,
  onCellClick,
  statusColor,
  onMoreButtonClick,
}) => {
  const handleCellClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    ({ currentTarget }) => {
      const { field } = currentTarget.dataset;

      if (field && onCellClick) {
        onCellClick({ id, field });
      }
    },
    [onCellClick, id]
  );

  const moreButtonClickHandler = useCallback(
    () => onMoreButtonClick && onMoreButtonClick(id),
    [onMoreButtonClick, id]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.status} style={{ backgroundColor: statusColor }} />
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
      {onMoreButtonClick && (
        <Button
          className={styles['more-button']}
          onClick={moreButtonClickHandler}
        >
          ⋯
        </Button>
      )}
    </div>
  );
};

export default GridRow;
