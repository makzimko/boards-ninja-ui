import React, { FC, MouseEventHandler, useCallback, useState } from 'react';
import classNames from 'classnames';

import { GridRowCellClickHandler, GridRowDetails, RowItem } from '../types';
import Button from '../../../ui/Button';

import styles from './GridRow.module.scss';

export type GridRowProps = {
  id: string;
  items: RowItem[];
  onCellClick?: GridRowCellClickHandler;
  statusColor?: string;
  rowDetails?: GridRowDetails;
};

const GridRow: FC<GridRowProps> = ({
  id,
  items,
  onCellClick,
  statusColor,
  rowDetails: RowDetailsComponent,
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

  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleDetails = useCallback(() => {
    setDetailsVisible((prevValue) => !prevValue);
  }, [setDetailsVisible]);

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
      {RowDetailsComponent && (
        <Button variant="square" onClick={toggleDetails}>
          ⋯
        </Button>
      )}
      {detailsVisible && RowDetailsComponent && (
        <RowDetailsComponent id={id} close={toggleDetails} />
      )}
    </div>
  );
};

export default GridRow;
