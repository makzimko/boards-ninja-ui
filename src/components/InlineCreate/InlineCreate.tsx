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
import Button from '../../ui/Button';

import styles from './InlineCreate.module.scss';

type InlineCreateProps = {
  onSubmit: (value: string) => void;
  defaultValue: string;
} & ComponentProps;

const InlineCreate: FC<InlineCreateProps> = ({
  containerClassName,
  onSubmit,
  defaultValue = '',
}) => {
  const [value, setValue] = useState<string>(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target }) => setValue(target.value),
    [setValue]
  );

  const handleSubmit = useCallback<FormEventHandler>(
    (e) => {
      e.preventDefault();
      onSubmit(value);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    [onSubmit, value]
  );

  return (
    <form
      className={classNames(styles.wrapper, containerClassName)}
      onSubmit={handleSubmit}
    >
      <input
        className={styles.input}
        value={value}
        onChange={handleChange}
        placeholder="Add new item..."
        ref={inputRef}
      />
      <div className={styles['left-gutter']} />
      <Button type="submit" className={styles.submit}>
        Add
      </Button>
    </form>
  );
};

export default InlineCreate;
