import React, { FC, useCallback } from 'react';
import classNames from 'classnames';

import { ComponentProps } from '../../types/component';
import Grid, { GridColumn, GridRowCellClickHandler } from '../Grid';
import { SimpleListItem, SimpleListItemClickHandler } from './types';

import styles from './SimpleList.module.scss';

export type SimpleListProps = {
  title: string;
  items: SimpleListItem[];
  onItemClick?: SimpleListItemClickHandler;
} & ComponentProps;

const SIMPLE_LIST_GRID_COLUMNS: GridColumn[] = [
  {
    field: 'name',
    clickable: true,
  },
];

const SimpleList: FC<SimpleListProps> = ({
  title,
  items,
  onItemClick,
  containerClassName,
}) => {
  const handleItemsClick = useCallback<GridRowCellClickHandler>(
    ({ id }) => {
      if (onItemClick) {
        onItemClick(id);
      }
    },
    [onItemClick]
  );

  return (
    <div className={classNames(styles.wrapper, containerClassName)}>
      <div className={styles.title}>{title}</div>
      <Grid
        items={items}
        columns={SIMPLE_LIST_GRID_COLUMNS}
        onCellClick={handleItemsClick}
      />
    </div>
  );
};

export default SimpleList;
