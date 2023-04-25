import { ChangeEvent, useContext, useState } from 'react';

import { StoreDispatchContext } from '../../../../providers/store-provider';
import { RESTAURANTS_PAGE } from '../../../../routes/pages';
import { supportedCities } from '../../data';
import { SearchWithList } from '../../search-with-list';

export const CitiesSearch = () => {
  const dispatch = useContext(StoreDispatchContext);
  const [cities, setCities] = useState<string[]>(supportedCities);

  const onSearchCities = (event: ChangeEvent<HTMLInputElement>) => {
    const userInput = String(event.target.value).toLowerCase();
    const foundCities = supportedCities.filter(cityName =>
      cityName.toLowerCase().includes(userInput)
    );
    setCities(foundCities);
  };

  const onCityClick = (cityName: string) => {
    dispatch({ selectedCity: cityName });
  };

  return (
    <SearchWithList
      entities={cities}
      onChange={onSearchCities}
      entityLinkTarget={RESTAURANTS_PAGE}
      onEntityClick={onCityClick}
    />
  );
};
