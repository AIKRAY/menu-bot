import { HomePage } from '../pages/home-page';
import { RestaurantsPage } from '../pages/restaurants-page';
import { SearchPage } from '../pages/search-page';
import { HOME_PAGE, RESTAURANTS_PAGE, SEARCH_PAGE } from './pages';

export default [
  {
    path: HOME_PAGE,
    component: () => <HomePage />,
  },
  {
    path: RESTAURANTS_PAGE,
    component: () => <RestaurantsPage />,
  },
  {
    path: SEARCH_PAGE,
    component: () => <SearchPage />,
  },
];
