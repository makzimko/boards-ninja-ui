import { useRecoilCallback } from 'recoil';
import axios from 'axios';

import { unitDetailsState } from './atoms';
import { UnitDetails } from './types';

const useUnitDetailsActions = () => {
  const fetch = useRecoilCallback(
    ({ set }) =>
      async (id: string) => {
        const { data } = await axios.get<UnitDetails>(`/v1/units/${id}`);

        set(unitDetailsState, data);
      },
    []
  );

  return { fetch };
};

export default useUnitDetailsActions;
