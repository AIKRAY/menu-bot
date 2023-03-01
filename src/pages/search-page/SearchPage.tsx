import { NavLink, useLocation } from 'react-router-dom';

import { HOME_PAGE } from '../../routes/pages';

export const SearchPage = () => {
  const { state } = useLocation();
  console.log(state);

  return (
    <div>
      <NavLink to={HOME_PAGE}>Go to Home</NavLink>
    </div>
  );
};
