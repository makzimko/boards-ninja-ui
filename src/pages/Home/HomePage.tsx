import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import useAuthActions, { userInfoState } from '../../atoms/auth';
import { Link } from 'react-router-dom';
import ProjectsList from '../../components/ProjectsList/ProjectsList';

const HomePage: FC = () => {
  const userInfo = useRecoilValue(userInfoState);
  const { logout } = useAuthActions();

  return (
    <div>
      {userInfo ? (
        <div>
          <ProjectsList />
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
