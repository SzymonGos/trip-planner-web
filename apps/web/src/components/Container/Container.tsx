import React, { FC, ReactNode } from 'react';
import cx from 'classnames';

type TContainerProps = {
  children: ReactNode;
  className?: string;
};

export const Container: FC<TContainerProps> = ({ children, className }) => (
  <div className={cx('max-w-[1440px] mx-auto px-4', className)}>{children}</div>
);
