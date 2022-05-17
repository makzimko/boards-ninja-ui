import React, { FC, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import './utils/request';
import './App.css';

import useAuthActions, { authLoadingState } from './atoms/auth';
import { useRecoilValue } from 'recoil';
import { LOADING } from './atoms/loading';
import AuthWrapper from './components/AuthWrapper/AuthWrapper';
import LoginForm from './components/LoginForm/LoginForm';
import HomePage from './pages/Home/HomePage';
import ProjectsList from './components/ProjectsList/ProjectsList';
import UnitsList from './pages/UnitsList/UnitsList';
import UnitDetails from './pages/UnitDetails/UnitDetails';

const App: FC = () => {
  const { fetchUserInfo } = useAuthActions();
  const authLoading = useRecoilValue(authLoadingState);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return [LOADING.SUCCESS, LOADING.ERROR].includes(authLoading) ? (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/projects">Project</Link>
      </nav>
      <Routes>
        <Route path="projects">
          <Route
            index
            element={
              <AuthWrapper>
                <ProjectsList />
              </AuthWrapper>
            }
          />
          <Route path=":projectKey">
            <Route
              index
              element={
                <AuthWrapper>
                  <UnitsList />
                </AuthWrapper>
              }
            />
            <Route
              path="units/:id"
              element={
                <AuthWrapper>
                  <UnitDetails />
                </AuthWrapper>
              }
            />
          </Route>
        </Route>
        <Route
          path="login"
          element={
            <AuthWrapper restricted={false} redirect="/">
              <LoginForm />
            </AuthWrapper>
          }
        />
        <Route index element={<HomePage />} />
        <Route path="*" element={<h1>fallback</h1>} />
      </Routes>
    </Router>
  ) : (
    <>Loading...</>
  );
};

export default App;
