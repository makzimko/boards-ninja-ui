import React, { FC, MouseEventHandler, useCallback } from 'react';
import SimpleListItem from './SimpleListItem/SimpleListItem';
import classNames from 'classnames';

import { ComponentProps } from '../../types/component';

import styles from './SimpleList.module.scss';

export type SimpleListProps = {
  title: string;
  items: {
    _id: string;
    name: string;
  }[];
  onItemClick?: (id: string) => void;
} & ComponentProps;

const SimpleList: FC<SimpleListProps> = ({
  title,
  items,
  onItemClick,
  containerClassName,
}) => {
  const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    ({ currentTarget }) => {
      const { id } = currentTarget.dataset;
      if (id && onItemClick) {
        onItemClick(id);
      }
    },
    []
  );

  return (
    <div className={classNames(styles.wrapper, containerClassName)}>
      <div className={styles.title}>{title}</div>
      {items.map(({ _id, name }) => (
        <div key={_id} data-id={_id} onClick={handleClick}>
          <SimpleListItem name={name} />
        </div>
      ))}
    </div>
  );
};

export default SimpleList;
