import axios from 'axios';
import { useRecoilCallback } from 'recoil';

import { projectsListLoadingState, projectsListState } from './atoms';
import { LOADING } from '../loading/types';
import { ProjectsList } from './types';

const useProjectsListActions = () => {
  const fetchAll = useRecoilCallback(({ set }) => async () => {
    set(projectsListLoadingState, LOADING.PENDING);

    try {
      const { data } = await axios.get<ProjectsList>('/v1/projects');

      set(projectsListLoadingState, LOADING.SUCCESS);
      set(projectsListState, data);
    } catch (e) {
      set(projectsListLoadingState, LOADING.ERROR);
    }
  });

  return { fetchAll };
};

export default useProjectsListActions;
