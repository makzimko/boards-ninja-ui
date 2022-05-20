import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import classNames from 'classnames';

import { ComponentProps } from '../../types/component';
import { ButtonAppearance, ButtonVariant } from './types';

import styles from './Button.module.scss';

type ButtonProps = ComponentProps & {
  children?: ReactNode;
  appearance?: ButtonAppearance;
  variant?: ButtonVariant;
} & ButtonHTMLAttributes<never>;

const Button: FC<ButtonProps> = ({
  children,
  appearance = 'default',
  variant = 'default',
  className,
  ...rest
}) => {
  return (
    <button
      className={classNames(
        styles.wrapper,
        styles[`appearance-${appearance}`],
        styles[`variant-${variant}`],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
