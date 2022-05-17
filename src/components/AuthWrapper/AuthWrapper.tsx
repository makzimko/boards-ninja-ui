import React, { FC, ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../atoms/auth';
import { Navigate } from 'react-router-dom';

type AuthWrapperProps = {
  restricted?: boolean;
  redirect?: string;
  children: ReactElement;
};

const AuthWrapper: FC<AuthWrapperProps> = ({
  restricted = true,
  redirect = '/login',
  children,
}) => {
  const userInfo = useRecoilValue(userInfoState);

  if ((!userInfo && restricted) || (userInfo && !restricted)) {
    return <Navigate to={redirect} />;
  }

  return children;
};

export default AuthWrapper;
