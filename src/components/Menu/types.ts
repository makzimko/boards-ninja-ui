export enum MenuItemType {
  Divider = 'divider',
}

export type DefaultMenuItem = {
  id: string;
  name: string;
};

export type DividerMenuItem = 'divider';

export const MenuDivider: DividerMenuItem = 'divider';

export type PlainMenuItem = DefaultMenuItem;

export type MenuItemsGroup = {
  index: number;
  items: PlainMenuItem[];
};

export type MenuItem = PlainMenuItem | DividerMenuItem;

export type MenuItems = MenuItem[];

export type MenuItemClickHandler = (id: string) => void;
