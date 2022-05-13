import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import useProjectsListActions, {
  projectsListLoadingState,
  projectsListState,
} from '../../atoms/projectsList';
import { LOADING } from '../../atoms/loading';

const ProjectsList: FC = () => {
  const { fetchAll } = useProjectsListActions();
  const projectsList = useRecoilValue(projectsListState);
  const projectsListLoading = useRecoilValue(projectsListLoadingState);

  useEffect(() => {
    if (projectsListLoading === LOADING.INITIAL) {
      fetchAll();
    }
  }, [projectsListLoading]);

  if ([LOADING.INITIAL, LOADING.PENDING].includes(projectsListLoading)) {
    return <h3>projects list loading...</h3>;
  }

  if (projectsListLoading === LOADING.ERROR) {
    return (
      <div>
        failed to load projects list
        <br />
        <button onClick={fetchAll}>retry</button>
      </div>
    );
  }
  return (
    <div>
      project list:
      <ul>
        {projectsList.map(({ name, key }) => (
          <li key={key}>
            <Link to={`/projects/${key}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsList;
