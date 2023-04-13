import { ChangeEvent, useState } from 'react';

// TODO: will lead to particular restaurant page
import { RESTAURANTS_PAGE } from '../../../../routes/pages';
import { LOCAL_STORAGE_SAVED_CITY_KEY } from '../../constants';
import { restaurantsByCities } from '../../data';
import { SearchWithList } from '../../search-with-list';

export const RestaurantsSearch = () => {
  // TODO: move to React.Context & update storing mechanism
  const currentCity: string = localStorage.getItem(
    LOCAL_STORAGE_SAVED_CITY_KEY
  ) as string;
  const [restaurants, setRestaurants] = useState<string[]>(
    restaurantsByCities[currentCity] || []
  );

  const onSearchCities = (event: ChangeEvent<HTMLInputElement>) => {
    const userInput = String(event.target.value).toLowerCase();
    const restaurantsInParticularCity = restaurantsByCities[currentCity];
    const foundRestaurants = restaurantsInParticularCity.filter(
      (restaurantName: string) =>
        restaurantName.toLowerCase().includes(userInput)
    );
    setRestaurants(foundRestaurants);
  };

  return (
    <SearchWithList
      entities={restaurants}
      onChange={onSearchCities}
      entityLinkTarget={RESTAURANTS_PAGE}
    />
  );
};
