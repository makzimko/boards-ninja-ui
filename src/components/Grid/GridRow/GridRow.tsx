import React, { FC } from 'react';

type GridRowProps = {
  items: {
    field: string;
    value: unknown;
  }[];
};

const GridRow: FC<GridRowProps> = ({ items }) => {
  return (
    <li>
      {items.map(({ field, value }) => (
        <span key={field}>{value as string}</span>
      ))}
    </li>
  );
};

export default GridRow;
