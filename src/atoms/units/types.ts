export type UnitId = string;

export type ApiUnit = {
  _id: UnitId;
  name: string;
  project: string;
  list: string;
  completed: boolean;
};

export type Unit = Omit<ApiUnit, '_id'> & {
  id: UnitId;
};
