import React, { FC, MouseEventHandler, useCallback, useMemo } from 'react';
import {
  MenuDivider,
  MenuItemClickHandler,
  MenuItems,
  MenuItemsGroup,
} from './types';

import styles from './Menu.module.scss';
import Button from '../../ui/Button';

type MenuProps = {
  items: MenuItems;
  onItemClick?: MenuItemClickHandler;
};

const Menu: FC<MenuProps> = ({ items, onItemClick }) => {
  const groups: MenuItemsGroup[] = useMemo(() => {
    return items
      .reduce<MenuItemsGroup[]>(
        (acc, item) => {
          if (item === MenuDivider) {
            return [{ index: acc.length, items: [] }, ...acc];
          }
          return [
            {
              ...acc[0],
              items: [...acc[0].items, item],
            },
            ...acc.slice(1),
          ];
        },
        [
          {
            index: 0,
            items: [],
          },
        ]
      )
      .reverse();
  }, [items]);

  const menuItemClickHandler = useCallback<MouseEventHandler<HTMLElement>>(
    ({ currentTarget }) => {
      const { id } = currentTarget.dataset;

      if (onItemClick && id) {
        onItemClick(id);
      }
    },
    [onItemClick]
  );

  return (
    <div className={styles.wrapper}>
      {groups.map(({ index, items: groupItems }) => (
        <div key={index} className={styles.group}>
          {groupItems.map(({ id, name }) => (
            <Button
              key={id}
              appearance="ghost"
              className={styles['menu-item']}
              onClick={menuItemClickHandler}
              data-id={id}
            >
              {name}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
