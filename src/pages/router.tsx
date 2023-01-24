import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import { Home } from './home/home';
import { Rdp } from './rdp/rdp';

export const HOME_PAGE_CONFIG = {
  path: '/',
  Component: Home,
};

export const PDP_CONFIG = {
  path: '/:title',
  Component: Rdp,
};

const PAGES_CONFIG = [HOME_PAGE_CONFIG, PDP_CONFIG];

export const Router = () => (
  <BrowserRouter>
    <Routes>
      {PAGES_CONFIG.map((props, index) => (
        <Route key={index} path={props.path} element={<props.Component />} />
      ))}
    </Routes>
  </BrowserRouter>
);
