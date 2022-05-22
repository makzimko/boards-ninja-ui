import { useRecoilCallback } from 'recoil';
import axios from 'axios';
import { ProjectKey, ProjectsList } from './types';
import { projectKeysState, projectState } from './atoms';

const useProjects = () => {
  const fetchList = useRecoilCallback(
    ({ set }) =>
      async () => {
        const { data } = await axios.get<ProjectsList>('/v1/projects');

        const projectKeys = data.map<ProjectKey>(({ key, ...rest }) => {
          set(projectState(key), (currVal) => ({
            ...currVal,
            ...rest,
            key,
          }));

          return key;
        });

        set(projectKeysState, projectKeys);
      },
    []
  );

  return { fetchList };
};

export default useProjects;
