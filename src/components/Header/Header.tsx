import React from 'react';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';

import useAuthActions, { userInfoState } from '../../atoms/auth';
import Button from '../../ui/Button';

import styles from './Header.module.scss';

const Header = () => {
  const userInfo = useRecoilValue(userInfoState);
  const { logout } = useAuthActions();
  return (
    <div className={styles.wrapper}>
      <Link to="/" className={styles.name}>
        Boards ninja
      </Link>
      {userInfo ? (
        <>
          <div>{userInfo.login}</div>
          <Button onClick={logout}>Logout</Button>
        </>
      ) : (
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
