import React, {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import { ComponentProps } from '../../types/component';
import { CreateListSubmitHandler } from './types';

import styles from './CreateList.module.scss';

type CreateListProps = {
  defaultValue?: string;
  onSubmit?: CreateListSubmitHandler;
} & ComponentProps;

const CreateList: FC<CreateListProps> = ({
  defaultValue = '',
  onSubmit,
  containerClassName,
}) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const startEditing = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target }) => setValue(target.value),
    [setValue]
  );

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleSubmit = useCallback<FormEventHandler>(
    (e) => {
      e.preventDefault();
      if (value && onSubmit) {
        onSubmit(value);
      }
      if (inputRef.current) {
        inputRef.current.blur();
      }
    },
    [value]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames(styles.wrapper, containerClassName)}
    >
      <input
        type="text"
        placeholder="List name"
        ref={inputRef}
        value={value}
        onChange={handleChange}
        className={styles.input}
      />
      <div className={styles.placeholder} onClick={startEditing}>
        + New List
      </div>
      <input type="submit" value="Add" className={styles.submit} />
    </form>
  );
};

export default CreateList;
