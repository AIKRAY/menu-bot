import { createContext } from 'react';

export interface IStoreContext {
  selectedCity: string;
}

export type StoreDispatchType = (storeProperty: Partial<IStoreContext>) => void;

export const defaultStore: IStoreContext = {
  selectedCity: '',
};

export const defaultStoreDispatch: StoreDispatchType = () => {};

export const StoreContext = createContext(defaultStore);
export const StoreDispatchContext = createContext(defaultStoreDispatch);
