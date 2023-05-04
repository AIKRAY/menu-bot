import { HashRouter, Route, Routes } from 'react-router-dom';

import PagesConfig from './pages-config';

export const Router = () => (
  <HashRouter>
    <Routes>
      {PagesConfig.map(page => (
        <Route key={page.path} path={page.path} element={<page.component />} />
      ))}
    </Routes>
  </HashRouter>
);
