import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PagesConfig from './pages-config';

export const Router = () => (
  <BrowserRouter>
    <Routes>
      {PagesConfig.map(page => (
        <Route key={page.path} path={page.path} element={<page.component />} />
      ))}
    </Routes>
  </BrowserRouter>
);
