import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useListsActions, { listsListState } from '../../atoms/lists';
import { useRecoilValue } from 'recoil';
import UnitsList from '../../components/UnitsList/UnitsList';

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
    <div>
      {lists.map(({ _id, name, predefined }) => (
        <UnitsList key={_id} id={_id} name={name} predefined={predefined} />
      ))}
    </div>
  );
};

export default ProjectLists;
