import { atom, selector } from 'recoil';

import { ProjectsList } from './types';
import { loadingState } from '../loading';

export const projectsListLoadingState = loadingState('ProjectsListLoading');

export const projectsListState = atom<ProjectsList>({
  key: 'ProjectsList',
  default: [],
});
