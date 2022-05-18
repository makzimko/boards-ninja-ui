import { useRecoilCallback } from 'recoil';
import axios from 'axios';

import { unitDetailsState } from './atoms';
import { UnitDetails } from './types';
import { unitsListState } from '../unitsList/atoms';

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

  const remove = useRecoilCallback(
    () => async (id) => {
      await axios.delete(`/v1/units/${id}`);
    },
    []
  );

  const moveUnit = useRecoilCallback(
    ({ set }) =>
      async (id: string, list: string) => {
        await axios.post(`/v1/units/move`, {
          ids: [id],
          list,
        });

        set(unitDetailsState, (prevState) => ({ ...prevState, list }));
      },
    []
  );

  return { fetch, update, remove, moveUnit };
};

export default useUnitDetailsActions;
