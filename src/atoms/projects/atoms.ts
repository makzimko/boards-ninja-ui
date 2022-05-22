import { atom, atomFamily, selector } from 'recoil';

import { Project, ProjectKey } from './types';

export const projectState = atomFamily<Project, ProjectKey>({
  key: 'ProjectState',
  default: undefined,
});

export const projectKeysState = atom<ProjectKey[]>({
  key: 'ProjectKeys',
  default: [],
});

export const projectsListState = selector<Project[]>({
  key: 'ProjectsList',
  get: ({ get }) => {
    const projectKeys = get(projectKeysState);

    return projectKeys.map((key) => get(projectState(key)));
  },
});
