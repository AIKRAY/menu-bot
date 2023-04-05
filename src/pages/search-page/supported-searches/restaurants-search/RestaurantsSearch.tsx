import { ChangeEvent, useState } from 'react';

// TODO: will lead to particular restaurant page
import { HOME_PAGE } from '../../../../routes/pages';
import { LOCAL_STORAGE_SAVED_CITY_KEY } from '../../constants';
import { restaurantsByCities } from '../../data';
import { SearchWithList } from '../../search-with-list';

export const RestaurantsSearch = () => {
  const [restaurants, setRestaurants] = useState<string[]>([]);
  // TODO: move to ref & update storing mechanism
  const currentCity: string = localStorage.getItem(
    LOCAL_STORAGE_SAVED_CITY_KEY
  ) as string;

  const onSearchCities = (event: ChangeEvent<HTMLInputElement>) => {
    const restaurantsInParticularCity = restaurantsByCities[currentCity];
    const foundRestaurants = restaurantsInParticularCity.filter(
      (restaurantName: string) => restaurantName.includes(event.target.value)
    );
    setRestaurants(foundRestaurants);
  };

  return (
    <SearchWithList
      entities={restaurants}
      onChange={onSearchCities}
      entityLinkTarget={HOME_PAGE}
    />
  );
};
