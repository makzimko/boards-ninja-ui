import React, { useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import useListsActions, { listsListState } from '../../atoms/lists';
import UnitsList from '../../components/UnitsList/UnitsList';
import CreateList from '../../components/CreateList/CreateList';

import styles from './ProjectLists.module.scss';

const ProjectLists = () => {
  const { projectKey } = useParams();
  const { fetch } = useListsActions();
  const lists = useRecoilValue(listsListState);

  useEffect(() => {
    if (projectKey) {
      fetch(projectKey);
    }
  }, [fetch, projectKey]);
  return (
    <div className={styles.wrapper}>
      {lists.map(({ _id, name, predefined }) => (
        <Fragment key={_id}>
          {predefined && (
            <CreateList containerClassName={styles['create-list']} />
          )}
          <UnitsList id={_id} name={name} predefined={predefined} />
        </Fragment>
      ))}
    </div>
  );
};

export default ProjectLists;
