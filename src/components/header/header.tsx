import './header.scss';

import { AppBar, Toolbar } from '@mui/material';
import { HOME_PAGE_CONFIG } from 'pages/router';
import { Link } from 'react-router-dom';

export const Header = (): JSX.Element => (
  <AppBar className="header">
    <Toolbar>
      <Link className="title" to={HOME_PAGE_CONFIG.path}>
        RestoMap
      </Link>
    </Toolbar>
  </AppBar>
);
