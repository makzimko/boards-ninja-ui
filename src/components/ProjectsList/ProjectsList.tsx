import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import useProjectsListActions, {
  projectsListLoadingState,
  projectsListState,
} from '../../atoms/projectsList';
import { LOADING } from '../../atoms/loading';
import SimpleList from '../SimpleList/SimpleList';

import styles from './ProjectsList.module.scss';

const ProjectsList: FC = () => {
  const { fetchAll } = useProjectsListActions();
  const projectsList = useRecoilValue(projectsListState);
  const projectsListLoading = useRecoilValue(projectsListLoadingState);
  const navigate = useNavigate();

  const formattedProjectList = useMemo(
    () => projectsList.map(({ key, name }) => ({ _id: key, name })),
    [projectsList]
  );

  useEffect(() => {
    if (projectsListLoading === LOADING.INITIAL) {
      fetchAll();
    }
  }, [projectsListLoading]);

  const goToProject = useCallback((projectKey: string) => {
    navigate(`/projects/${projectKey}`);
  }, []);

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
    <div className={styles.wrapper}>
      <SimpleList
        title="Projects"
        items={formattedProjectList}
        onItemClick={goToProject}
      />
    </div>
  );
};

export default ProjectsList;
