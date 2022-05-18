import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import { ComponentProps } from '../../types/component';
import { ButtonAppearance } from './types';

import styles from './Button.module.scss';
import classNames from 'classnames';

type ButtonProps = ComponentProps & {
  children: ReactNode;
  appearance?: ButtonAppearance;
} & ButtonHTMLAttributes<never>;

const Button: FC<ButtonProps> = ({
  children,
  appearance = 'default',
  ...rest
}) => {
  return (
    <button
      className={classNames(styles.wrapper, styles[`appearance-${appearance}`])}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
