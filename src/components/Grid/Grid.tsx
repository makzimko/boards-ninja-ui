import React, { FC, useMemo } from 'react';
import GridRow from './GridRow/GridRow';

type GridProps = {
  items: {
    id: string;
    [key: string]: unknown;
  }[];
  columns: {
    field: string;
  }[];
};

const Grid: FC<GridProps> = ({ items, columns }) => {
  const rows = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        items: columns.map(({ field }) => ({ field, value: item[field] })),
      })),
    [items, columns]
  );

  return (
    <div>
      <ul>
        {rows.map(({ id, items }) => (
          <GridRow key={id} items={items} />
        ))}
      </ul>
    </div>
  );
};

export default Grid;
