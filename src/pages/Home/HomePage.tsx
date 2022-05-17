import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import useAuthActions, { userInfoState } from '../../atoms/auth';
import { Link } from 'react-router-dom';

const HomePage: FC = () => {
  const userInfo = useRecoilValue(userInfoState);
  const { logout } = useAuthActions();

  console.log('USRE', userInfo);

  return (
    <div>
      <h1>boards ninja</h1>
      {userInfo ? (
        <div>
          user: {userInfo.login} <br />
          <button onClick={logout}>logout</button>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};

export default HomePage;
