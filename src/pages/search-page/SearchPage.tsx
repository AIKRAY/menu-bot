import { useLocation } from 'react-router-dom';

import { SEARCH_TYPE_CITIES, SEARCH_TYPE_RESTAURANTS } from './constants';
import { CitiesSearch, RestaurantsSearch } from './supported-searches';

// TODO: change to some fallback
const EmptyComponent = () => <div />;

export const SearchPage = () => {
  const { state: locationState } = useLocation();

  let SearchComponent = EmptyComponent;

  switch (locationState.type) {
    case SEARCH_TYPE_CITIES:
      SearchComponent = CitiesSearch;
      break;
    case SEARCH_TYPE_RESTAURANTS:
      SearchComponent = RestaurantsSearch;
      break;
    default:
      break;
  }

  return <SearchComponent />;
};
