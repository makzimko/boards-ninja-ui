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

  const update = useRecoilCallback(
    ({ set }) =>
      async (id: string, props: Partial<UnitDetails>) => {
        const { data } = await axios.patch<UnitDetails>(
          `/v1/units/${id}`,
          props
        );

        set(unitDetailsState, data);
      },
    []
  );

  const remove = useRecoilCallback(() => async (id) => {
    await axios.delete(`/v1/units/${id}`);
  });

  return { fetch, update, remove };
};

export default useUnitDetailsActions;
