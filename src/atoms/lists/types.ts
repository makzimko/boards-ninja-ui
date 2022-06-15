export type ListId = string;

export type ApiList = {
  _id: ListId;
  name: string;
  predefined: boolean;
};

export type List = Omit<ApiList, '_id'> & {
  id: ListId;
};
