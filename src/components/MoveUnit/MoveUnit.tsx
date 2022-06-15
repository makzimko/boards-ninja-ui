import React, {
  ChangeEventHandler,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Button from '../../ui/Button';
import useUnitsActions, { UnitId, unitState } from '../../atoms/units';
import { useRecoilValue } from 'recoil';
import { listsListState } from '../../atoms/lists';
import { ComponentProps } from '../../types/component';

type MoveUnitProps = {
  id: UnitId;
} & ComponentProps;

const MoveUnit: FC<MoveUnitProps> = ({ id, containerClassName }) => {
  const { moveUnit } = useUnitsActions();
  const [newList, setNewList] = useState('');
  const unit = useRecoilValue(unitState(id));
  const lists = useRecoilValue(listsListState);

  const otherLists = useMemo(
    () => (unit ? lists.filter(({ id }) => id !== unit.list) : []),
    [lists, unit]
  );

  const handleListChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    ({ currentTarget }) => {
      setNewList(currentTarget.value);
    },
    []
  );

  useEffect(() => {
    if (otherLists.length > 0) {
      setNewList(otherLists[0].id);
    }
  }, [otherLists]);

  const handleMove = useCallback(() => {
    if (id) {
      moveUnit(id, newList);
    }
  }, [newList, moveUnit]);

  return (
    <div className={containerClassName}>
      <select onChange={handleListChange} value={newList}>
        {otherLists.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
      <Button onClick={handleMove}>Move</Button>
    </div>
  );
};

export default MoveUnit;
