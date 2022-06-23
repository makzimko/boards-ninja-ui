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
import UnitDetails from './pages/UnitDetails/UnitDetails';
import ProjectLists from './pages/ProjectLists/ProjectLists';
import Header from './components/Header';
import Breadcrumbs from './components/Breadcrumbs';
import Notification from './components/Notification';

const App: FC = () => {
  const { fetchUserInfo } = useAuthActions();
  const authLoading = useRecoilValue(authLoadingState);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return [LOADING.SUCCESS, LOADING.ERROR].includes(authLoading) ? (
    <Router>
      <Header />
      <Notification />
      <Routes>
        <Route path="projects">
          <Route
            index
            element={
              <AuthWrapper>
                <div>
                  <Breadcrumbs
                    items={[
                      { id: 'home', name: 'home' },
                      { id: 'project', name: 'project name' },
                      { id: 'unit', name: 'unit name' },
                    ]}
                  />
                  <ProjectsList />
                </div>
              </AuthWrapper>
            }
          />
          <Route path=":projectKey">
            <Route
              index
              element={
                <AuthWrapper>
                  <ProjectLists />
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
