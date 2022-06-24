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

import styles from './TextEdit.module.scss';
import { InlineTextEditSubmitHandler } from '../../components/InlineTextEdit';
import Button from '../Button';

export type TextEditorProps = {
  value: string;
  onSubmit?: InlineTextEditSubmitHandler;
  type?: 'input' | 'textarea';
  placeholder?: string;
  wrapperClassName?: string;
  valueClassName?: string;
  inputClassName?: string;
};

const TextEditor: FC<TextEditorProps> = ({
  value: defaultValue,
  onSubmit,
  placeholder = 'Text should be here...',
  wrapperClassName,
  valueClassName,
  inputClassName,
}) => {
  const [isEditing, setIsEditing] = useState(true);
  const [value, setValue] = useState<string>('');
  const ref = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [blurTimeout, setBlurTimeout] = useState<NodeJS.Timeout | undefined>(
    undefined
  );

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const toggleEditing = useCallback(() => {
    setIsEditing((val) => !val);
  }, [setIsEditing]);

  const handleChange = useCallback<
    ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  >(({ target }) => setValue(target.value), [setValue]);

  const setFocus = useCallback(() => {
    setIsFocused(true);
    setTimeout(() => {
      if (ref.current) {
        const contentLength = ref.current.value.length;
        ref.current.setSelectionRange(contentLength, contentLength);
        ref.current.style.height = `1px`;
        ref.current.style.height = `${ref.current.scrollHeight + 2}px`;
      }
    }, 0);
  }, [setIsFocused]);

  const resetFocus = useCallback(() => setIsFocused(false), [setIsFocused]);

  const handleSubmit = useCallback<FormEventHandler>(
    (e) => {
      e.preventDefault();
      if (onSubmit && value !== defaultValue) {
        onSubmit(value);
      }
      toggleEditing();
    },
    [value, defaultValue, onSubmit, toggleEditing]
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

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = `1px`;
      ref.current.style.height = `${ref.current.scrollHeight + 2}px`;
    }
  }, [value]);

  return (
    <div className={classNames(styles.wrapper, wrapperClassName)}>
      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          onFocus={setFocus}
          onBlur={resetFocus}
          className={styles.form}
        >
          <textarea
            ref={ref}
            className={classNames(styles.textarea, inputClassName)}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            rows={1}
            autoFocus
          />
          <Button
            appearance="default"
            variant="square"
            className={styles.button}
          >
            ✓
          </Button>
        </form>
      ) : (
        <div
          onClick={toggleEditing}
          dangerouslySetInnerHTML={{
            __html: defaultValue.replace(/\n/g, '<br />') || placeholder,
          }}
          className={classNames(styles.value, valueClassName, {
            [styles.placeholder]: defaultValue.length === 0,
          })}
        />
      )}
    </div>
  );
};

export default TextEditor;
