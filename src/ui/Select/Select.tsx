import React, {
  ChangeEventHandler,
  FC,
  SelectHTMLAttributes,
  useCallback,
} from 'react';
import classNames from 'classnames';

import { SelectChangeHandler, SelectItem } from './types';

import styles from './Select.module.scss';

type SelectProps = Omit<SelectHTMLAttributes<never>, 'onChange'> & {
  items: SelectItem[];
  value: string;
  onChange?: SelectChangeHandler;
};

const Select: FC<SelectProps> = ({ items, className, onChange, ...rest }) => {
  const handleListChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    ({ currentTarget }) => {
      if (onChange) {
        onChange(currentTarget.value);
      }
    },
    []
  );

  return (
    <div className={styles.wrapper}>
      <select
        onChange={handleListChange}
        {...rest}
        className={classNames(styles.select, className)}
      >
        {items.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
