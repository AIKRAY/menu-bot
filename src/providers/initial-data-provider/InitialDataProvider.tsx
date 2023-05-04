import { ReactElement } from 'react';

import { IStoreContext, StoreProvider } from '../store-provider';
import { LOCAL_STORAGE_SAVED_CITY_KEY } from './constants';

interface IInitialDataProviderProps {
  children: ReactElement;
}

// The component to collect main app data at the very beginning
export const InitialDataProvider = ({
  children,
}: IInitialDataProviderProps) => {
  // TODO: Use city from Telegram
  const extractCity = (): string =>
    localStorage.getItem(LOCAL_STORAGE_SAVED_CITY_KEY) as string;

  const saveCityLocally = ({ selectedCity }: Partial<IStoreContext>) => {
    localStorage.setItem(LOCAL_STORAGE_SAVED_CITY_KEY, String(selectedCity));
  };

  const initialStore = {
    selectedCity: extractCity(),
  };

  return (
    <StoreProvider
      initialValue={initialStore}
      dispatchCallback={saveCityLocally}
    >
      {children}
    </StoreProvider>
  );
};
