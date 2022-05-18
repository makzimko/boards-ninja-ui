import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import useProjectsListActions, {
  projectsListLoadingState,
  projectsListState,
} from '../../atoms/projectsList';
import { LOADING } from '../../atoms/loading';
import SimpleList, {
  SimpleListItem,
  SimpleListItemClickHandler,
} from '../SimpleList';

import styles from './ProjectsList.module.scss';
import Button from '../../ui/Button';

const ProjectsList: FC = () => {
  const { fetchAll } = useProjectsListActions();
  const projectsList = useRecoilValue(projectsListState);
  const projectsListLoading = useRecoilValue(projectsListLoadingState);
  const navigate = useNavigate();

  useEffect(() => {
    if (projectsListLoading === LOADING.INITIAL) {
      fetchAll();
    }
  }, [projectsListLoading]);

  const formattedProjectList2 = useMemo(
    () =>
      projectsList.map<SimpleListItem>(({ key, name }) => ({ id: key, name })),
    [projectsList]
  );

  const goToProject = useCallback<SimpleListItemClickHandler>((id) => {
    navigate(`/projects/${id}`);
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
        title="Projects list"
        items={formattedProjectList2}
        onItemClick={goToProject}
      />
    </div>
  );
};

export default ProjectsList;
