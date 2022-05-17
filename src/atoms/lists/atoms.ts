import { atom } from 'recoil';
import { ListsList } from './types';

export const listsListState = atom<ListsList>({
  key: 'ListsList',
  default: [],
});
