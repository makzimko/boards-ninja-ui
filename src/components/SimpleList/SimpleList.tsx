import React, { FC, ReactNode, useCallback } from 'react';
import classNames from 'classnames';

import { ComponentProps } from '../../types/component';
import Grid, {
  GridColumn,
  GridRowCellClickHandler,
  GridRowDetails,
  GridRowStatusColorFormatter,
} from '../Grid';
import { SimpleListItem, SimpleListItemClickHandler } from './types';

import styles from './SimpleList.module.scss';
import { GridProps } from '../Grid/Grid';

export type SimpleListProps = {
  title: string;
  items: SimpleListItem[];
  onItemClick?: SimpleListItemClickHandler;
  headerExtraContent?: ReactNode;
  statusColorFormatter?: GridRowStatusColorFormatter;
  rowDetails?: GridRowDetails;
} & Omit<GridProps, 'items' | 'columns' | 'onCellClick'> &
  ComponentProps;

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
  headerExtraContent,
  containerClassName,
  ...rest
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
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        {headerExtraContent}
      </div>
      <Grid
        items={items}
        columns={SIMPLE_LIST_GRID_COLUMNS}
        onCellClick={handleItemsClick}
        {...rest}
      />
    </div>
  );
};

export default SimpleList;
