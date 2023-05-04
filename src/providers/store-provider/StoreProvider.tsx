import { ReactElement, useCallback, useState } from 'react';

import {
  IStoreContext,
  StoreContext,
  StoreDispatchContext,
} from './storeContext';

interface IStoreProviderProps {
  children: ReactElement;
  initialValue: IStoreContext;
  dispatchCallback?: (storeProperties: Partial<IStoreContext>) => void;
}

export const StoreProvider = ({
  children,
  initialValue,
  dispatchCallback,
}: IStoreProviderProps) => {
  // Can be replaced with useReducer in future
  const [store, setStore] = useState(initialValue);

  const updateStoreProperties = useCallback(
    (storeProperties: Partial<IStoreContext>) => {
      setStore({
        ...store,
        ...storeProperties,
      });
      if (dispatchCallback) {
        dispatchCallback(storeProperties);
      }
    },
    [store, setStore, dispatchCallback]
  );

  return (
    <StoreContext.Provider value={store}>
      <StoreDispatchContext.Provider value={updateStoreProperties}>
        {children}
      </StoreDispatchContext.Provider>
    </StoreContext.Provider>
  );
};
