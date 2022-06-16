import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import useListsActions, { listsListState } from '../../atoms/lists';
import UnitsList from '../../components/UnitsList/UnitsList';
import CreateList from '../../components/CreateList/CreateList';
import { LOADING } from '../../atoms/loading';

import styles from './ProjectLists.module.scss';

const ProjectLists = () => {
  const { projectKey } = useParams();
  const { fetch, createListInProject } = useListsActions();
  const lists = useRecoilValue(listsListState);
  const [newListName, setNewListName] = useState('');
  const [listsLoading, setListsLoading] = useState(LOADING.INITIAL);

  useEffect(() => {
    setListsLoading(LOADING.PENDING);
    if (projectKey) {
      fetch(projectKey).then(() => {
        setListsLoading(LOADING.SUCCESS);
      });
    }
  }, [fetch, projectKey]);

  const createList = useCallback(
    (name: string) => {
      if (projectKey) {
        setNewListName(name);
        createListInProject(name, projectKey).then(() => {
          setNewListName('');
        });
      }
    },
    [projectKey]
  );
  return (
    <div className={styles.wrapper}>
      {listsLoading === LOADING.SUCCESS &&
        lists.map(({ id, name, predefined }) => (
          <Fragment key={id}>
            {predefined && (
              <CreateList
                containerClassName={styles['create-list']}
                onSubmit={createList}
                defaultValue={newListName}
              />
            )}
            <UnitsList id={id} name={name} predefined={predefined} />
          </Fragment>
        ))}
    </div>
  );
};

export default ProjectLists;
