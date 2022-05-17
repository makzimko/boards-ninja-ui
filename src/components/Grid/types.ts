export type GridRowCellClickHandler = (options: {
  id: string;
  field: string;
}) => void;

export type GridColumn = {
  field: string;
  clickable?: boolean;
};

export type RowItem = {
  value: unknown;
} & Pick<GridColumn, 'field' | 'clickable'>;
