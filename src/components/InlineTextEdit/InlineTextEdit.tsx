import React, {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import styles from './InlineTextEdit.module.scss';
import Button from '../../ui/Button';

export type InlineTextEditProps = {
  value: string;
  onSubmit?: (value: string) => void;
};

const InlineTextEdit: FC<InlineTextEditProps> = ({
  value: defaultValue,
  onSubmit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [blurTimeout, setBlurTimeout] = useState<NodeJS.Timeout | undefined>(
    undefined
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const toggleEditing = useCallback(() => {
    setIsEditing((val) => !val);
  }, [setIsEditing]);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target }) => setValue(target.value),
    [setValue]
  );

  const setFocus = useCallback(() => setIsFocused(true), [setIsFocused]);
  const resetFocus = useCallback(() => setIsFocused(false), [setIsFocused]);

  const handleSubmit = useCallback<FormEventHandler>(
    (e) => {
      e.preventDefault();
      if (onSubmit) {
        onSubmit(value);
      }
      toggleEditing();
    },
    [value, onSubmit, toggleEditing]
  );

  useEffect(() => {
    if (isEditing) {
      if (isFocused && blurTimeout) {
        clearTimeout(blurTimeout);
        setBlurTimeout(undefined);
      } else if (!isFocused && !blurTimeout) {
        const timeout = setTimeout(() => {
          setIsEditing(false);
        }, 100);
        setBlurTimeout(timeout);
      }
    } else {
      if (blurTimeout) {
        setBlurTimeout(undefined);
      }
    }
  }, [isFocused, isEditing, blurTimeout]);

  return (
    <div className={styles.wrapper}>
      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          onFocus={setFocus}
          onBlur={resetFocus}
          className={styles.form}
        >
          <input
            type="text"
            className={styles.input}
            value={value}
            onChange={handleChange}
            placeholder="some placeholder..."
            autoFocus
          />
          <Button appearance="default" variant="square">
            ✓
          </Button>
        </form>
      ) : (
        <div onClick={toggleEditing} className={styles.value}>
          {defaultValue}
        </div>
      )}
    </div>
  );
};

export default InlineTextEdit;
