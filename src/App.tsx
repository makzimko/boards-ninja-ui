import React, { FC, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';

import './utils/request';
import './App.css';

import useAuthActions, { authLoadingState } from './atoms/auth';
import { useRecoilValue } from 'recoil';
import { LOADING } from './atoms/loading/types';
import AuthWrapper from './components/AuthWrapper/AuthWrapper';

const App: FC = () => {
  const { fetchUserInfo } = useAuthActions();
  const authLoading = useRecoilValue(authLoadingState);

  useEffect(() => {
    fetchUserInfo()
      .then((a) => console.log('AUTH SUCCESS', a))
      .catch((e) => console.log('AUTH FAIL', e));
  }, []);

  return [LOADING.SUCCESS, LOADING.ERROR].includes(authLoading) ? (
    <Router>
      <Routes>
        <Route
          path="projects"
          element={
            <div>
              projects root
              <Outlet />
            </div>
          }
        >
          <Route index element={<div>project details</div>} />
          <Route path="key" element={<div>project key</div>} />
        </Route>
        <Route
          path="units"
          element={
            <AuthWrapper>
              <>units</>
            </AuthWrapper>
          }
        />
        <Route
          path="login"
          element={
            <AuthWrapper restricted={false} redirect="/dashboard">
              <>login</>
            </AuthWrapper>
          }
        />
        <Route index element={<h1>index</h1>} />
        <Route path="*" element={<h1>fallback</h1>} />
      </Routes>
    </Router>
  ) : (
    <>Loading...</>
  );
};

export default App;
