import { ChangeEvent, useContext, useState } from 'react';

import { StoreContext } from '../../../../providers/store-provider';
// TODO: will lead to particular restaurant page
import { RESTAURANTS_PAGE } from '../../../../routes/pages';
import { restaurantsByCities } from '../../data';
import { SearchWithList } from '../../search-with-list';

export const RestaurantsSearch = () => {
  const { selectedCity } = useContext(StoreContext);
  const [restaurants, setRestaurants] = useState<string[]>(
    restaurantsByCities[selectedCity] || []
  );

  const onSearchCities = (event: ChangeEvent<HTMLInputElement>) => {
    const userInput = String(event.target.value).toLowerCase();
    const restaurantsInParticularCity = restaurantsByCities[selectedCity];
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
