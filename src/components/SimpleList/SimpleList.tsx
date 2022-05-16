import React, { FC } from 'react';

export type SimpleListProps = {
  items: {
    id: string;
    name: string;
  }[];
};
const SimpleList: FC<SimpleListProps> = ({ items }) => {
  return (
    <div>
      {items.map(({ id, name }) => (
        <div key={id}>
          {id} {name}
        </div>
      ))}
    </div>
  );
};

export default SimpleList;
