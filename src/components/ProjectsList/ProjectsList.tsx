import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import useProjectsListActions, {
  projectsListLoadingState,
  projectsListState,
} from '../../atoms/projectsList';
import { LOADING } from '../../atoms/loading';
import { Grid, GridColumn, GridItem, GridRowCellClickHandler } from '../Grid';

import styles from './ProjectsList.module.scss';

const PROJECTS_LIST_GRID_COLUMNS: GridColumn[] = [
  {
    field: 'name',
    clickable: true,
  },
];

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
    () => projectsList.map<GridItem>(({ key, name }) => ({ id: key, name })),
    [projectsList]
  );

  const goToProject = useCallback<GridRowCellClickHandler>(({ id }) => {
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
      <Grid
        items={formattedProjectList2}
        columns={PROJECTS_LIST_GRID_COLUMNS}
        onCellClick={goToProject}
      />
    </div>
  );
};

export default ProjectsList;
