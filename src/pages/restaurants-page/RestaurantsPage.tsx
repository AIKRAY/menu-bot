import { NavLink } from 'react-router-dom';

import { HOME_PAGE } from '../../routes/pages';
import { Footer } from '../common/footer';

export const RestaurantsPage = () => (
  <div>
    <NavLink to={HOME_PAGE}>Go to Home</NavLink>
    <Footer />
  </div>
);
