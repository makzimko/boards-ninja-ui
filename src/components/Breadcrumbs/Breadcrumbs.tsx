import React, { FC } from 'react';

import { BreadcrumbsClickHandler, BreadcrumbsItem } from './types';

import styles from './Breadcrumbs.module.scss';

export type BreadcrumbsProps = {
  items: BreadcrumbsItem[];
  onClick?: BreadcrumbsClickHandler;
};

const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <div className={styles.wrapper}>
      {items.map(({ id, name }, index) => (
        <>
          {index > 0 && <span className={styles.divider}>&#8250;</span>}
          <span key={id} className={styles.item}>
            {name} {name}
          </span>
        </>
      ))}
    </div>
  );
};

export default Breadcrumbs;
