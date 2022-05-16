import React, { FC } from 'react';
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
} & ComponentProps;

const SimpleList: FC<SimpleListProps> = ({
  title,
  items,
  containerClassName,
}) => {
  return (
    <div className={classNames(styles.wrapper, containerClassName)}>
      <div className={styles.title}>{title}</div>
      {items.map(({ _id, name }) => (
        <SimpleListItem key={_id} name={name} />
      ))}
    </div>
  );
};

export default SimpleList;
