export type GridRowCellClickHandler = (options: {
  id: string;
  field: string;
}) => void;

export type GridItem = {
  id: string;
  [key: string]: unknown;
};

export type GridColumnFormatter = (
  field: { id: string; name: string },
  value: unknown
) => unknown;

export type GridColumn = {
  field: string;
  clickable?: boolean;
  formatter?: GridColumnFormatter;
};

export type RowItem = {
  value: unknown;
} & Pick<GridColumn, 'field' | 'clickable' | 'formatter'>;

export type GridRowStatusColorFormatter = (
  item: GridItem
) => string | undefined;
