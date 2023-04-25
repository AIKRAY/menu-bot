import { RestaurantsPage } from '../pages/restaurants-page';
import { SearchPage } from '../pages/search-page';
import { PROFILE_PAGE, RESTAURANTS_PAGE, SEARCH_PAGE } from './pages';

export default [
  {
    path: RESTAURANTS_PAGE,
    component: RestaurantsPage,
  },
  {
    path: SEARCH_PAGE,
    component: SearchPage,
  },
  {
    path: PROFILE_PAGE,
    component: () => <div />,
  },
];
