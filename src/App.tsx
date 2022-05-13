import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Outlet,
} from 'react-router-dom';

import './utils/request';
import './App.css';

const App: FC = () => {
  return (
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
        <Route index element={<h1>index</h1>} />
        <Route path="*" element={<h1>fallback</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
