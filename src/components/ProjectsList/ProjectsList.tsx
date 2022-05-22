import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import SimpleList, {
  SimpleListItem,
  SimpleListItemClickHandler,
} from '../SimpleList';
import { LOADING } from '../../atoms/loading';
import useProjects, { projectsListState } from '../../atoms/projects';

import styles from './ProjectsList.module.scss';

const ProjectsList: FC = () => {
  const { fetchList } = useProjects();
  const projectsList = useRecoilValue(projectsListState);

  const [loading, setLoading] = useState(LOADING.INITIAL);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(LOADING.PENDING);
    fetchList()
      .then(() => setLoading(LOADING.SUCCESS))
      .catch(() => setLoading(LOADING.ERROR));
  }, [fetchList, setLoading]);

  const formattedProjectList = useMemo(
    () =>
      projectsList.map<SimpleListItem>(({ key, name }) => ({ id: key, name })),
    [projectsList]
  );

  const goToProject = useCallback<SimpleListItemClickHandler>((id) => {
    navigate(`/projects/${id}`);
  }, []);

  if ([LOADING.INITIAL, LOADING.PENDING].includes(loading)) {
    return <h3>projects list loading...</h3>;
  }

  if (loading === LOADING.ERROR) {
    return (
      <div>
        failed to load projects list
        <br />
        <button onClick={fetchList}>retry</button>
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <SimpleList
        title="Projects list"
        items={formattedProjectList}
        onItemClick={goToProject}
      />
    </div>
  );
};

export default ProjectsList;
