import { atom, atomFamily, selector } from 'recoil';
import { List, ListId } from './types';

export const listState = atomFamily<List, ListId>({
  key: 'ListState',
  default: undefined,
});

export const listIdsState = atom<ListId[]>({
  key: 'ListIds',
  default: [],
});

export const listsListState = selector<List[]>({
  key: 'ListsList',
  get: ({ get }) => {
    const listIds = get(listIdsState);

    return listIds.map((id) => get(listState(id)));
  },
});
