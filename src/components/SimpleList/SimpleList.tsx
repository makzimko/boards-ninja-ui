import React, { FC, ReactNode, useCallback } from 'react';
import classNames from 'classnames';

import { ComponentProps } from '../../types/component';
import Grid, {
  GridColumn,
  GridMoreButtonClickHandler,
  GridRowCellClickHandler,
  GridRowStatusColorFormatter,
} from '../Grid';
import { SimpleListItem, SimpleListItemClickHandler } from './types';

import styles from './SimpleList.module.scss';

export type SimpleListProps = {
  title: string;
  items: SimpleListItem[];
  onItemClick?: SimpleListItemClickHandler;
  statusColorFormatter?: GridRowStatusColorFormatter;
  headerExtraContent?: ReactNode;
  onMoreButtonClick?: GridMoreButtonClickHandler;
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
  statusColorFormatter,
  headerExtraContent,
  containerClassName,
  onMoreButtonClick,
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
        statusColorFormatter={statusColorFormatter}
        onMoreButtonClick={onMoreButtonClick}
      />
    </div>
  );
};

export default SimpleList;
