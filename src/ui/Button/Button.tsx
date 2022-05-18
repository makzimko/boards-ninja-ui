import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import classNames from 'classnames';

import { ComponentProps } from '../../types/component';
import { ButtonAppearance } from './types';

import styles from './Button.module.scss';

type ButtonProps = ComponentProps & {
  children?: ReactNode;
  appearance?: ButtonAppearance;
} & ButtonHTMLAttributes<never>;

const Button: FC<ButtonProps> = ({
  children,
  appearance = 'default',
  className,
  ...rest
}) => {
  return (
    <button
      className={classNames(
        styles.wrapper,
        styles[`appearance-${appearance}`],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
